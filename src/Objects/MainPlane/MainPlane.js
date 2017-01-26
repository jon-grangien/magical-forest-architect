import * as THREE from 'three';
var glsl = require('glslify');

/**
 * App main ground plane
 */
class MainPlane {

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width and height.
   * @param {object} uniforms - App light uniforms
   */
  constructor(size, uniforms) {
    const geometry = new THREE.PlaneGeometry(size.width, size.height);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: glsl('./shaders/vert.glsl'),
      fragmentShader: glsl('./shaders/frag.glsl')
    });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  update() {}

  getMesh() {
    return this.mesh;
  }

}

export default MainPlane
