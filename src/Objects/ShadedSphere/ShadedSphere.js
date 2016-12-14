import * as THREE from 'three';
var glsl = require('glslify');

/**
 * Simple Sphere class with custom shaders
 */
class ShadedSphere {

  /**
   * @param size
   * Object of number radius, number widthSegments, number heightSegments
   *
   * @param uniforms
   * Object of app main uniforms
   */
  constructor(size, uniforms) {
    const geometry = new THREE.SphereGeometry(size.radius, size.widthSegments, size.heightSegments);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: glsl('./vertexshader.glsl'),
      fragmentShader: glsl('./fragmentshader.glsl')
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