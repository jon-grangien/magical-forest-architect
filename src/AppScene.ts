import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
import * as TWEEN from '@tweenjs/tween.js'
// import TrackballControls from 'three-trackballcontrols'

import Sun from './components/Sun'
import Uniforms from './UniformsSingleton'
import AppControls from './utils/Controls.ts'
import { SUN_COMPONENT_KEY, SUN_INITIAL_POSITION } from './constants'

/**
 * Main class
 */
class AppScene {
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public renderer: THREE.WebGLRenderer
  public frameCounter: number = 0

  private components: any
  private controls: AppControls
  private clock: THREE.Clock
  private sun: Sun

  constructor() {
    this.components = {}
    this.createScene()
  }

  createScene() {

    // Scene, camera
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('rgb(0,23,23)')

    this.scene.rotation.z += Math.PI / 2
    this.scene.rotation.x -= Math.PI / 2
    this.scene.add(new THREE.AxisHelper(100))

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    // this.camera.position.set(-500.0, -700.0, 200.0)
    this.camera.position.set(-5.0, 70.0, 0.0)
    this.camera.up.set(0, 1, 0)
    this.camera.lookAt(new THREE.Vector3(SUN_INITIAL_POSITION.x, SUN_INITIAL_POSITION.y, SUN_INITIAL_POSITION.z).normalize())

    // const quaternion = new THREE.Quaternion()
    // quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), Math.PI / 2 )
    // this.camera.quaternion.copy(quaternion)

    const uniforms = Uniforms.Instance.uniforms

    // Renderer
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClear = false
    document.body.appendChild(this.renderer.domElement)

    uniforms.u_resolution.value.x = this.renderer.domElement.width
    uniforms.u_resolution.value.y = this.renderer.domElement.height
    this.controls = new AppControls(this.camera, this.renderer.domElement)

    document.addEventListener('click', () => {
      if (!this.controls.getControls().isLocked) {
        this.controls.getControls().lock()
        console.log(this.camera.getWorldDirection())
      } else {
        this.controls.getControls().unlock()
      }
    }, false)

    // this.scene.add(this.controls.getControls().getObject())
    this.clock = new THREE.Clock(true)

    this.render()
  }

  /**
   * Add a component to the components list and render it in scene
   * @param {string} key - The key to set the component as a corresponding value
   * @param component - The instantiated component of the given component class
   * @returns The component that was added
   */
  addComponent(key: string, component: any) {
    this.components[key] = component
    this.scene.add(component)
    return component
  }

  /**
   * Remove an component from the components list and the scene
   * @param {string} key - The key whose value is the component to remove
   * @returns The component that was removed
   */
  removeComponent(key: string) {
    const component = this.components[key]
    this.scene.remove(component)
    delete this.components[key]
    return component
  }

  /**
   * @param key - Name of the component
   */
  getComponent(key: string) {
    return this.components[key]
  }

  render() {
    requestAnimationFrame(() => {
      TWEEN.update()
      this.render()
    })

    this.frameCounter++

    this.renderer.clear()

    Uniforms.Instance.uniforms.u_time.value += 0.05

    for (const key in this.components) {
      if (this.components.hasOwnProperty(key)) {
        this.components[key].update()
      }
    }

    // this.camera.position.z += 1

    this.renderer.render(this.scene, this.camera)
    this.controls.update(this.clock.getDelta())

    // if (this.frameCounter === 100) {
      // // this.scene.rotation.y = -30 * Math.PI / 90
      // // this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
      // this.camera.position.set(-100.0, 0.0, 0.0)
      // this.camera.up = new THREE.Vector3(0.0, 0.0, 1.0)
      // // this.camera.lookAt(new THREE.Vector3(0.0, 1.0, 0.0))
      // // this.camera.lookAt(this.getComponent(SUN_COMPONENT_KEY).position)
      // this.camera.lookAt(new THREE.Vector3(0.0, 1.0, 0.0))
    // }

    // if (this.frameCounter === 120) {

      // // todo: modify controls
      // this.controls.switchToPlayerView(this.camera, this.renderer.domElement)
      // // this.camera.rotation.x = Math.PI / 2.0
      // this.camera.updateProjectionMatrix()
      // this.camera.updateMatrixWorld(true)
    // }
  }
}

export default AppScene
