import App from './App'
import ShadedSphere from './components/ShadedSphere/'
import MainPlane from './components/MainPlane/'
import WaterPlane from './components/WaterPlane/'
import StarSystem from './components/StarSystem/MeshStarSystem'
import Gui from './utils/GUI'
import UniformSingleton from './UniformsSingleton'
// import * as THREE from 'three'
import * as constants from './constants'

const uniforms = UniformSingleton.Instance.uniforms

let app = new App()

function onWindowResize() {
  app.renderer.setSize(window.innerWidth, window.innerHeight)
  app.camera.aspect = window.innerWidth / window.innerHeight
  app.camera.updateProjectionMatrix()
  uniforms.u_resolution.value.x = app.renderer.domElement.width
  uniforms.u_resolution.value.y = app.renderer.domElement.height
}

window.addEventListener( 'resize', onWindowResize, false )

app.addComponent(constants.SHADED_SPHERE_COMPONENT, new ShadedSphere({
  radius: 5,
  widthSegments: 32,
  heightSegments: 32,
}))

app.addComponent(constants.MAIN_PLANE_COMPONENT, new MainPlane({
  width: constants.PLANE_WIDTH_HEIGHT,
  height: constants.PLANE_WIDTH_HEIGHT,
  widthSegments: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
  heightSegments: constants.PLANE_WIDTH_HEIGHT_SEGMENTS,
}))

app.addComponent(constants.WATER_COMPONENT, new WaterPlane({
  width: constants.WATER_WIDTH_HEIGHT,
  height: constants.WATER_WIDTH_HEIGHT,
  widthSegments: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
  heightSegments: constants.WATER_WIDTH_HEIGHT_SEGMENTS,
}))

app.addComponent(constants.STAR_SYSTEM_COMPONENT, new StarSystem(18, 8000))

// Rotate scene for better view
app.scene.rotation.y = -30 * Math.PI / 90

// Init GUI
const gui: any = new Gui()

export default app
