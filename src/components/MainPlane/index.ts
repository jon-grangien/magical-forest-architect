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

    const geometry = new THREE.PlaneBufferGeometry(size.width, size.height, size.widthSegments, size.heightSegments)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      side: THREE.DoubleSide,
      uniforms,
      defines: {
        USE_MAP: ''
      }
    })

    this.mesh = new THREE.Mesh(geometry, material)
  }

  public update() {}

  get getComponent() {
    return this.mesh
  }
}

export default MainPlane
