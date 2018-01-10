import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import { BufferAttribute, InterleavedBufferAttribute, IUniform } from 'three';

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
    const unis: any = UniformSingleton.Instance.uniforms

    const geometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(size.width, size.height, size.widthSegments, size.heightSegments)
    const vertices: BufferAttribute | InterleavedBufferAttribute = geometry.getAttribute('position')
    const uniforms: IUniforms = {
      u_time: unis.u_time,
      u_resolution: unis.u_resolution,
      vertices: { type: 'v3', value: vertices }     
    }

    const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
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
