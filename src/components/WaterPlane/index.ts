import * as THREE from 'three'
const glslify = require('glslify')
import UniformSingleton from '../../UniformsSingleton'

/**
 * App water plane
 */
class WaterPlane {
  private size: any
  private mesh: THREE.Mesh

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width, height, widthSegments, heightSegments.
   */
  constructor(size: any) {
    this.size = size
    this.initialize()
  }

  initialize() {
    const { size } = this
    const uniforms: any = UniformSingleton.Instance.uniforms

    const geometry = new THREE.PlaneGeometry(size.width, size.height, size.widthSegments, size.heightSegments)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/vert.glsl'),
      fragmentShader: require('./shaders/frag.glsl'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.FrontSide,
      transparent: true
    })

    this.mesh = new THREE.Mesh(geometry, material)
  }

  public update() {}

  private getMesh(): THREE.Mesh {
    return this.mesh
  }
}

export default WaterPlane
