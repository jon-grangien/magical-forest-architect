import * as THREE from 'three';

/**
 * Simple Sphere class with custom shaders
 */
class ShadedSphere {

  /**
   * @param size
   * Object of number radius, number widthSegments, number heightSegments
   */
  constructor(size) {
    const geometry = new THREE.SphereGeometry(size.radius, size.widthSegments, size.heightSegments);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    });

    this.mesh = new THREE.Mesh(geometry, material);
  }

  update() {
    this.mesh.rotation.y += 0.05;
  }

  getMesh() {
    return this.mesh;
  }
}

export default ShadedSphere