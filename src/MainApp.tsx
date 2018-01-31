import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { bind } from 'decko'
import { store, actions } from './store'
import * as WebFontLoader from 'webfontloader'
import GUI from './GUI'

import AppScene from './AppScene'
import ShadedSphere from './components/ShadedSphere/'
import MainPlane from './components/MainPlane/'
import WaterPlane from './components/WaterPlane/'
import MeshStarSystem from './components/StarSystem/MeshStarSystem'
import ParticleStarSystem from './components/StarSystem/ParticleStarSystem'
import Cloud from './components/Cloud/'
import UniformSingleton from './UniformsSingleton'
import * as THREE from 'three'
import * as constants from './constants'
import BaseComponent from './components/BaseComponent'

declare let GOOGLE_WEB_FONTS: string[]

interface IMainAppProps {
  name: string
  depth: number
  height: number
  scale: number
  stateAsUniforms: string[]
}

class MainApp extends Component<IMainAppProps, any> {
  private appSceneHandle: THREE.Scene

  constructor(props: IMainAppProps) {
    super(props)
    this.state = {
      mounted: false
    }
  }

  @bind
  addComponent(component: BaseComponent) {
    this.appSceneHandle.add(component.compMesh)
  }

  componentWillMount() {

    // Load Google fonts
    let webFontLoaderOptions: any = null
    let webFontsToLoad: string[] = GOOGLE_WEB_FONTS // defined in webpack config
    if (webFontsToLoad.length > 0) {
      webFontLoaderOptions = (webFontLoaderOptions || {})
      webFontLoaderOptions.google = {
          families: webFontsToLoad
      }
    }

    if (webFontLoaderOptions) {
      WebFontLoader.load(webFontLoaderOptions)
    }
  }

  componentDidMount() {
    const uniforms = UniformSingleton.Instance.uniforms
    let app = new AppScene()

    this.appSceneHandle = app.scene

    function onWindowResize() {
      app.renderer.setSize(window.innerWidth, window.innerHeight)
      app.camera.aspect = window.innerWidth / window.innerHeight
      app.camera.updateProjectionMatrix()
      uniforms.u_resolution.value.x = app.renderer.domElement.width
      uniforms.u_resolution.value.y = app.renderer.domElement.height
    }

    window.addEventListener( 'resize', onWindowResize, false )

    app.addComponent(constants.MAIN_PLANE_COMPONENT, new MainPlane({
      width: constants.PLANE_WIDTH_HEIGHT,
      height: constants.PLANE_WIDTH_HEIGHT,
      widthSegments: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
      heightSegments: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
    },
      app.renderer
    ))

    // Set hill values to be changed to make listeners react to initial values
    UniformSingleton.Instance.setHillValuesUpdated()

    app.addComponent(constants.WATER_COMPONENT, new WaterPlane({
      width: constants.WATER_WIDTH_HEIGHT,
      height: constants.WATER_WIDTH_HEIGHT,
      widthSegments: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
      heightSegments: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
    }))

    app.addComponent(constants.MESH_STAR_SYSTEM_COMPONENT, new MeshStarSystem(18, 8000))
    app.addComponent(constants.PARTICLE_STAR_SYSTEM_COMPONENT, new ParticleStarSystem(500, 6000))

    // for (let i = 0; i < constants.NUMBER_OF_CLOUDS; i++) {
    //   const size = THREE.Math.randFloat(60, 160)
    //   app.addComponent(constants.CLOUD_COMPONENT + i.toString(), new Cloud(size, 32, 32))
    // }

    // Rotate scene for better view
    app.scene.rotation.y = -30 * Math.PI / 90

    this.setState({ mounted: true }, () => console.log('changed state'))
  }

  // Simple bridge between redux store and uniforms
  componentWillReceiveProps(nextProps: IMainAppProps) {
    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {
        if (nextProps[key] !== this.props[key] && this.props.stateAsUniforms.indexOf(key) > -1) {
          UniformSingleton.Instance.uniforms[`u_${key}`].value = nextProps[key]
          UniformSingleton.Instance.setHillValuesUpdated()
        }
      }
    }
  }

  shouldComponentUpdate() {

    // Don't re-render after component has rendered, mounted, and re-rendered once
    if (this.state.mounted) {
      return false
    }
  }

  render(_props: any, state: any) {
    console.log('render')
    return <div>
      <GUI /> 
      { state.mounted ? (
        <Cloud size={120}
              widthSegs={32}
              heightSegs={32} 
              onDone={this.addComponent} />
      ) : null }
    </div>
  }
}

const mapToProps = ({ depth, height, scale, stateAsUniforms }) => ({ 
  depth, 
  height, 
  scale, 
  stateAsUniforms 
})

export default connect(mapToProps, actions)(MainApp)
