import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'
import { IPlaneSize } from '../../utils/CommonInterfaces'

/**
 * App water plane
 */
class WaterPlane extends BaseComponent {
  private size: IPlaneSize

  /**
   * Constructor
   * @param {IPlaneSize} size - Sizes of geometry. 
   */
  constructor(size: IPlaneSize) {
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

    const geometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(size.width, size.height, size.widthSegs, size.heightSegs)
    const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    })

    this.add(new THREE.Mesh(geometry, material))
  }

  /**
   * @Override
   */
  public update(): void {}
}

export default WaterPlane

