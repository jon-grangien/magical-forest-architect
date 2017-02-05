import * as THREE from 'three';
const TrackballControls = require('three-trackballcontrols');

import Sun from './components/Sun';
import UniformSingleton from './UniformsSingleton';

/**
 * Main class
 */
class App {
  constructor() {
    this.objects = [];

    this.uniforms = new UniformSingleton().uniforms;

    this.createScene();
  }

  createScene() {

    // Scene, camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.set(-512, -794.0, 208.0);
    this.camera.lookAt(0.0, 0.0, 0.0);

    // Load sun texture
    const texLoader = new THREE.TextureLoader();
    texLoader.load('public/sunstrip.png', texture => {
      const sunTexture = texture;
      sunTexture.minFilter = THREE.LinearFilter;
      this.uniforms.u_sunTexture.value = sunTexture;
    });

    // Add sun
    const sunLightColor = 0xF4F142;
    const sunPos = this.uniforms.u_sunLightPos.value;
    this.sun = new Sun(64, 16, 16, sunPos, sunLightColor);
    this.scene.add( this.sun.getMesh() );

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.uniforms.u_time.value += 0.05;

    this.objects.forEach((object) => {
        object.update();
    });

    this.sun.getMesh().position.x += 0.09 * Math.sin(0.08 * this.uniforms.u_time.value);
    this.uniforms.u_sunLightPos.value = this.sun.getMesh().position;

    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  addObject(object) {
    this.objects.push(object);
    this.scene.add(object.getMesh());
    return object;
  }

}

export default App
