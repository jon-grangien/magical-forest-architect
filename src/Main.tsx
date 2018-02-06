import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { store, actions } from './store'
import * as WebFontLoader from 'webfontloader'
import GUI from './GUI'
import InfoBox from './GUI/InfoBox'

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

declare let GOOGLE_WEB_FONTS: string[]

interface IMainAppProps {
  renderWater: boolean
  depth: number
  height: number
  scale: number
  stateAsUniforms: string[],
  isChrome: boolean
}

interface IMainAppState {
  showGUI: boolean
}

class Main extends Component<IMainAppProps, any> {
  readonly CHROME_ADVICE: string
  private _appHandle: AppScene

  constructor(props: IMainAppProps) {
    super(props)

    this.state = {
      showGUI: false
    }

    this.CHROME_ADVICE = 'You are running a browser that is not Chrome. This app works best in a modern version of Chrome, as some features may not work properly in other browsers at this stage of development.'
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

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        this.setState({
          showGUI: true
        })
      }, 100)
    })

    const uniforms = UniformSingleton.Instance.uniforms
    let app = new AppScene()
    this._appHandle = app

    function onWindowResize() {
      app.renderer.setSize(window.innerWidth, window.innerHeight)
      app.camera.aspect = window.innerWidth / window.innerHeight
      app.camera.updateProjectionMatrix()
      uniforms.u_resolution.value.x = app.renderer.domElement.width
      uniforms.u_resolution.value.y = app.renderer.domElement.height
    }

    window.addEventListener( 'resize', onWindowResize, false )

    app.addComponent(constants.MAIN_PLANE_COMPONENT_KEY, new MainPlane({
      width: constants.PLANE_WIDTH_HEIGHT,
      height: constants.PLANE_WIDTH_HEIGHT,
      widthSegs: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
      heightSegs: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
    },
      app.renderer
    ))

    // Set hill values to be changed to make listeners react to initial values
    UniformSingleton.Instance.setHillValuesUpdated()

    app.addComponent(constants.WATER_COMPONENT_KEY, new WaterPlane({
      width: constants.WATER_WIDTH_HEIGHT,
      height: constants.WATER_WIDTH_HEIGHT,
      widthSegs: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
      heightSegs: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
    }))

    app.addComponent(constants.MESH_STAR_SYSTEM_COMPONENT_KEY, new MeshStarSystem(18, 8000))
    app.addComponent(constants.PARTICLE_STAR_SYSTEM_COMPONENT_KEY, new ParticleStarSystem(500, 6000))

    for (let i = 0; i < constants.NUMBER_OF_CLOUDS; i++) {
      const size = THREE.Math.randFloat(60, 160)
      app.addComponent(constants.CLOUD_COMPONENT_KEY + i.toString(), new Cloud(size, 32, 32))
    }

    // Rotate scene for better view
    app.scene.rotation.y = -30 * Math.PI / 90
  }

  // Simple bridge between redux store and uniforms
  componentWillReceiveProps(nextProps: IMainAppProps) {
    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {

        // Uniforms
        if (nextProps[key] !== this.props[key] && this.props.stateAsUniforms.indexOf(key) > -1) {
          UniformSingleton.Instance.uniforms[`u_${key}`].value = nextProps[key]
          UniformSingleton.Instance.setHillValuesUpdated()
        }

        else if (nextProps[key] !== this.props[key] && key === 'renderWater') {

          // Add or remove water component
          if (nextProps[key]) {
            this._appHandle.addComponent(constants.WATER_COMPONENT_KEY, new WaterPlane({
              width: constants.WATER_WIDTH_HEIGHT,
              height: constants.WATER_WIDTH_HEIGHT,
              widthSegs: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
              heightSegs: constants.WATER_WIDTH_HEIGHT_SEGMENTS
            }))
          } else {
            this._appHandle.removeComponent(constants.WATER_COMPONENT_KEY)
          }
        }
      }
    }
  }

  shouldComponentUpdate() {
    return !this.state.showGUI // Don't allow re-renders anymore after we let GUI to be rendered
  }

  render(props: IMainAppProps, state: IMainAppState) {
    const { showGUI } = state
    if (!showGUI) {
      return null
    }

    return <div> 
      <GUI /> 
      { !props.isChrome && <InfoBox msg={this.CHROME_ADVICE} /> }
    </div>
  }
}

const mapToProps = ({ renderWater, depth, height, scale, stateAsUniforms, isChrome }): IMainAppProps => ({ 
  renderWater, 
  depth, 
  height, 
  scale, 
  stateAsUniforms,
  isChrome
})

export default connect(mapToProps, actions)(Main)
