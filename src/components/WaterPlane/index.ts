import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'

/**
 * App water plane
 */
class WaterPlane extends BaseComponent {
  private size: any

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width, height, widthSegments, heightSegments.
   */
  constructor(size: any) {
    super()
    this.size = size
    this.initialize()
  }

  initialize() {
    const { size } = this
    const unis: any = UniformSingleton.Instance.uniforms

    const uniforms: IUniforms = {
      u_time: unis.u_time,
      u_resolution: unis.u_resolution,
      u_sunLightPos: unis.u_sunLightPos
    }

    // const test = THREE.ShaderLib.phong.fragmentShader

    const geometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(size.width, size.height, size.widthSegments, size.heightSegments)
    const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.DoubleSide,
      transparent: true
    })

    this._objectHandle = new THREE.Mesh(geometry, material)
  }

  public update() {}
}

export default WaterPlane
