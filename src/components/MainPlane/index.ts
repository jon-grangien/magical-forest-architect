import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'

/**
 * App main ground plane
 */
class MainPlane {
  private mesh: THREE.Mesh

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width, height, widthSegments, heightSegments.
   */
  constructor(size: any) {
    const uniforms: any = UniformSingleton.Instance.uniforms

    const geometry = new THREE.PlaneGeometry(size.width, size.height, size.widthSegments, size.heightSegments)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/vert.glsl'),
      fragmentShader: require('./shaders/frag.glsl'),
      side: THREE.DoubleSide,
      uniforms,
      defines: {
        USE_MAP: ''
      }
    })

    this.mesh = new THREE.Mesh(geometry, material)
  }

  public update() {}

  public getMesh() {
    return this.mesh
  }
}

export default MainPlane
