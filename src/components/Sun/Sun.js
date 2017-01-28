import * as THREE from 'three';
const glslify = require('glslify');

/**
 * Sun with procedurally animated texture, main light source
 */
class Sun {

  /**
   * Constructor
   * @param {number} size - Size of the sphere geometries
   * @param {number} widthSegments - Width segments of the sphere geometries
   * @param {number} heightSegments - Height segments of the sphere geometries
   * @param {object} position - Object of x, y, z components for sphere position in world space
   * @param {number} lightColor - Color of light source
   * @param {object} uniforms - App uniforms
   */
  constructor(size, widthSegments, heightSegments, position, lightColor, uniforms) {
    const geometry = new THREE.SphereGeometry(size,  widthSegments, heightSegments);
    const material = new THREE.ShaderMaterial({
      vertexShader: glslify('./shaders/texture_vert.glsl'),
      fragmentShader: glslify('./shaders/texture_frag.glsl'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.FrontSide,
      transparent: true
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(position.x, position.y, position.z);

    // Light source
    this.mesh.add( new THREE.PointLight(lightColor, 1, 1000.0) );

    // Glow object
    this.mesh.add( this.addGlow(size, widthSegments, heightSegments) );
  }

  addGlow(size, width, height) {
    const geometry = new THREE.SphereGeometry(1.25 * size, width, height);
    const material = new THREE.ShaderMaterial({
      vertexShader: glslify('./shaders/glow_vert.glsl'),
      fragmentShader: glslify('./shaders/glow_frag.glsl'),
      defines: {
        USE_MAP: ''
      },
      side: THREE.BackSide,
      transparent: true
    })

    return new THREE.Mesh(geometry, material);
  }

  getMesh() {
    return this.mesh;
  }
}

export default Sun