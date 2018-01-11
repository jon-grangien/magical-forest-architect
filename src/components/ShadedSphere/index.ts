import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'

/**
 * Simple Sphere class with custom shaders
 */
class ShadedSphere {
  private mesh: THREE.Mesh

  /**
   * Constructor
   * @param {object} size - Object of number radius, number widthSegments, number heightSegments
   */
  constructor(size: any) {
    const uniforms: any = UniformSingleton.Instance.uniforms

    const geometry = new THREE.SphereGeometry(size.radius, size.widthSegments, size.heightSegments)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: require('./shaders/vert.glsl'),
      fragmentShader: require('./shaders/frag.glsl')
    })

    this.mesh = new THREE.Mesh(geometry, material)
  }

  update() {
    this.mesh.rotation.y += 0.007
  }

  get getComopnent(): THREE.Mesh {
    return this.mesh
  }
}

export default ShadedSphere
