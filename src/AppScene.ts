import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
import * as TWEEN from '@tweenjs/tween.js'
import * as constants from './constants'

import Sun from './components/Sun'
import Uniforms from './UniformsSingleton'
import AppControls from './utils/Controls'
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
  private _orbitViewIsActive: boolean = true

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

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 20000)
    this.camera.position.set(1200.0, 400.0, 0.0)
    this.camera.up.set(0, 1, 0)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))

    const uniforms = Uniforms.Instance.uniforms

    // Renderer
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.autoClear = false
    document.body.appendChild(this.renderer.domElement)

    uniforms.u_resolution.value.x = this.renderer.domElement.width
    uniforms.u_resolution.value.y = this.renderer.domElement.height
    this.controls = new AppControls(this.camera, this.renderer.domElement)

    this.clock = new THREE.Clock(true)

    this.render()

    const onKeyDown = (event) => {
      switch (event.keyCode) {
        case 32: // space

          if (this._orbitViewIsActive) {
            this.switchToPlayerView()
          } else {
            this.switchToOrbitView()
          }

          break
        default:
          break
      }
    }
    document.addEventListener('keydown', onKeyDown, false)
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

  switchToPlayerView() {
    this.camera.position.set(-5.0, 70.0, 0.0)
    this.camera.up.set(0, 1, 0)

    this.controls.switchToPlayerView(this.camera, this.renderer.domElement)

    this.camera.lookAt(new THREE.Vector3(SUN_INITIAL_POSITION.x, SUN_INITIAL_POSITION.y, SUN_INITIAL_POSITION.z).normalize())
    this._orbitViewIsActive = false
  }

  switchToOrbitView() {
    this.camera.position.set(1200.0, 400.0, 0.0)
    this.camera.up.set(0, 1, 0)

    this.controls.switchToOrbitView(this.camera, this.renderer.domElement)

    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this._orbitViewIsActive = true
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

    if (!this._orbitViewIsActive) {
      const { x, y, z } = this.camera.position

      const workingObject = new THREE.Object3D()
      workingObject.position.set(x, z, y)

      // // inverse rotation to match scene
      workingObject.rotation.x += Math.PI / 2
      workingObject.rotation.z -= Math.PI / 2

      const mainPlaneComponent = this.getComponent(constants.MAIN_PLANE_COMPONENT_KEY)
      const heightValue = mainPlaneComponent.getHeightValueForXYPosition(workingObject.position.x, workingObject.position.y) + 50
      // const heightValue = mainPlaneComponent.getHeightValueForXYPosition(x, z) + 50
      // workingObject.z = height

      this.camera.position.set(x, heightValue, z)
    }

    // console.log(this.camera.position)
    this.controls.update(this.clock.getDelta(), this.camera)
    this.renderer.render(this.scene, this.camera)
  }
}

export default AppScene
