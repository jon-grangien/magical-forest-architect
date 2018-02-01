import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'

/**
 * Simple Sphere class with custom shaders
 */
class ShadedSphere extends BaseComponent {

  /**
   * Constructor
   * @param {object} size - Object of number radius, number widthSegments, number heightSegments
   */
  constructor(size: any) {
    super()
    const uniforms: any = UniformSingleton.Instance.uniforms

    const geometry = new THREE.SphereGeometry(size.radius, size.widthSegments, size.heightSegments)
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: require('./shaders/vert.glsl'),
      fragmentShader: require('./shaders/frag.glsl')
    })

    this.add(new THREE.Mesh(geometry, material))
  }

  /**
   * @Override
   */
  update() {
    this.rotation.y += 0.007
  }
}

export default ShadedSphere
