import * as THREE from 'three';
const glslify = require('glslify');

/**
 * Simple Sphere class with custom shaders
 */
class ShadedSphere {

  /**
   * Constructor
   * @param {object} size - Object of number radius, number widthSegments, number heightSegments
   * @param {object} uniforms - Object of app main uniforms
   */
  constructor(size, uniforms) {
    const geometry = new THREE.SphereGeometry(size.radius, size.widthSegments, size.heightSegments);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: glslify('./shaders/vert.glsl'),
      fragmentShader: glslify('./shaders/frag.glsl')
    });

    this.mesh = new THREE.Mesh(geometry, material);
  }

  update() {
    this.mesh.rotation.y += 0.007;
  }

  getMesh() {
    return this.mesh;
  }
}

export default ShadedSphere