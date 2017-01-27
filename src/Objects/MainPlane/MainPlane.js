import * as THREE from 'three';

/**
 * App main ground plane
 */
class MainPlane {

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width, height, widthSegments, heightSegments.
   * @param {object} uniforms - App light uniforms
   */
  constructor(size, uniforms) {
    const geometry = new THREE.PlaneGeometry(size.width, size.height, size.widthSegments, size.heightSegments);
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/vert.glsl'),
      fragmentShader: require('./shaders/frag.glsl'),
      uniforms,
      defines: {
        USE_MAP: ''
      }
    });

    this.mesh = new THREE.Mesh(geometry, material);
  }

  update() {}

  getMesh() {
    return this.mesh;
  }

}

export default MainPlane
