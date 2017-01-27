import * as THREE from 'three';
const glslify = require('glslify');

class Sun {
  constructor(size, widthSegments, heightSegments, position, lightColor, uniforms) {
    const geometry = new THREE.SphereGeometry(size,  widthSegments, heightSegments);
    //const material = new THREE.ShaderMaterial({
    //  vertexShader: glslify('./shaders/vert.glsl'),
    //  fragmentShader: glslify('./shaders/frag.glsl'),
    //  uniforms,
    //  defines: {
    //    USE_MAP: ''
    //  }
    //});
    const material = new THREE.MeshBasicMaterial( { color: lightColor } )

    this.mesh = new THREE.Mesh(geometry, material);

    this.init(position, lightColor);
  }

  init(position, lightColor) {
    const sunLight = new THREE.PointLight( lightColor, 10.0, 4000.0 );
    this.mesh.add(sunLight);

    this.mesh.position.set(position.x, position.y, position.z);
  }

  udpate() {}

  getMesh() {
    return this.mesh;
  }
}

export default Sun