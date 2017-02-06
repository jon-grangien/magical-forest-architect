import * as THREE from 'three';

let instance = null;

class UniformSingleton {
  constructor() {
    if (!instance)
      instance = this;

    this.sunPosition = { x: 450.0, y: 5000.0, z: 400.0 };
    this.uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },

      u_sunLightColor: new THREE.Uniform(new THREE.Vector3(1.0, 0.7, 0.6)),
      u_sunLightPos: new THREE.Uniform(new THREE.Vector3(this.sunPosition.x, this.sunPosition.y, this.sunPosition.z)),
      u_sunTexture: { type: "t", value: null },

      u_bumpHeight: { type: "f", value: 50.0 },
      u_height: { type: "f", value: 5.0 },
      u_hillFactor: { type: "f", value: 0.0005 },
      u_spikyness: { type: "f", value: 0.0001 },
    }

    return instance;
  }

}

export default UniformSingleton