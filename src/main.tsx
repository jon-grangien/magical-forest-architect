import { h, render, Component } from 'preact'
import { Provider } from 'unistore/preact'
import { store } from './store'
import TestComp from './components/TestComp'
import GUI from './GUI'

import AppScene from './AppScene'
import ShadedSphere from './components/ShadedSphere/'
import MainPlane from './components/MainPlane/'
import WaterPlane from './components/WaterPlane/'
import MeshStarSystem from './components/StarSystem/MeshStarSystem'
import ParticleStarSystem from './components/StarSystem/ParticleStarSystem'
import Cloud from './components/Cloud/'
import Gui from './utils/GUI'
import UniformSingleton from './UniformsSingleton'
import * as THREE from 'three'
import * as constants from './constants'

interface IMainAppProps {
  name: string
}

class MainApp extends Component<IMainAppProps, any> {
  constructor(props: IMainAppProps) {
    super(props)
  }

  componentDidMount() {
    const uniforms = UniformSingleton.Instance.uniforms
    let app = new AppScene()

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

    for (let i = 0; i < constants.NUMBER_OF_CLOUDS; i++) {
      const size = THREE.Math.randFloat(60, 160)
      app.addComponent(constants.CLOUD_COMPONENT + i.toString(), new Cloud(size, 32, 32))
    }

    // Rotate scene for better view
    app.scene.rotation.y = -30 * Math.PI / 90

    // Init GUI
    const gui: any = new Gui()
  }

  render() {
    return <div>
      <TestComp />
      <GUI />
    </div>
  }
}

// export default app

render(<Provider store={store}>
  <MainApp name='Mainapp' />
  </Provider>, 
  document.getElementById('app'))
