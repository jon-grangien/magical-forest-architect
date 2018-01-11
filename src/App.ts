import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
// import TrackballControls from 'three-trackballcontrols'

import Sun from './components/Sun'
import Uniforms from './UniformsSingleton'

/**
 * Main class
 */
class App {
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public renderer: THREE.WebGLRenderer

  private components: any
  private controls: any
  private sun: Sun

  constructor() {
    this.components = {}
    this.createScene()
  }

  createScene() {

    // Scene, camera
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    this.camera.position.set(-512, -794.0, 208.0)
    this.camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0))

    const uniforms = Uniforms.Instance.uniforms

    // Load sun texture
    const texLoader = new THREE.TextureLoader()
    texLoader.load('public/sunstrip.png', texture => {
      const sunTexture = texture
      sunTexture.minFilter = THREE.LinearFilter
      uniforms.u_sunTexture.value = sunTexture
    })

    // Add sun
    const sunLightColor = 0xF4F142
    const sunPos = uniforms.u_sunLightPos.value
    this.sun = new Sun(512, 32, 32, sunPos, sunLightColor)
    this.scene.add( this.sun.getComponent )

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    uniforms.u_resolution.value.x = this.renderer.domElement.width
    uniforms.u_resolution.value.y = this.renderer.domElement.height
    this.controls = new TrackballControls(this.camera, this.renderer.domElement)

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
    this.scene.add(component.getComponent)
    return component
  }

  /**
   * Remove an component from the components list and the scene
   * @param {string} key - The key whose value is the component to remove
   * @returns The component that was removed
   */
  removeComponent(key: string) {
    const component = this.components[key]
    this.scene.remove(component.getMesh())
    delete this.components[key]
    return component
  }

  render() {
    requestAnimationFrame(() => {
      this.render()
    })

    Uniforms.Instance.uniforms.u_time.value += 0.05

    for (const comp of this.components) {
      comp.update()
    }

    this.sun.getComponent.position.x += 0.09 * Math.sin(0.08 * Uniforms.Instance.uniforms.u_time.value)
    Uniforms.Instance.uniforms.u_sunLightPos.value = this.sun.getComponent.position

    this.renderer.render(this.scene, this.camera)
    this.controls.update()
  }
}

export default App
