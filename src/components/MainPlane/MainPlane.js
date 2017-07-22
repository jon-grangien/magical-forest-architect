import * as THREE from 'three';
const glslify = require('glslify');
import UniformSingleton from '../../UniformsSingleton';

/**
 * App main ground plane
 */
class MainPlane {

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width, height, widthSegments, heightSegments.
   */
  constructor(size) {
    const uniforms = new UniformSingleton().uniforms;

    const geometry = new THREE.PlaneGeometry(size.width, size.height, size.widthSegments, size.heightSegments);
    const material = new THREE.ShaderMaterial({
      vertexShader: glslify('./shaders/vert.glsl'),
      fragmentShader: glslify('./shaders/frag.glsl'),
      side: THREE.DoubleSide,
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
