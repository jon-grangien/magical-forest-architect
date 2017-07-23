import * as THREE from 'three';
const TrackballControls = require('three-trackballcontrols');

import Sun from './components/Sun';
import UniformSingleton from './UniformsSingleton';
import GLobalsSingleton from './GlobalsSingleton';

/**
 * Main class
 */
class App {
  constructor() {
    this.objects = {};

    this.uniforms = new UniformSingleton().uniforms;
    this.globals = new GLobalsSingleton().globals;

    this.createScene();
  }

  createScene() {

    // Scene, camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 15000);
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
    this.sun = new Sun(1024, 32, 32, sunPos, sunLightColor);
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

  /**
   * Add an object to the objects list and render it in scene
   * @param {string} key - The key to set the object as a corresponding value to
   * @param object - The instantiated object
   * @returns The object that was added
   */
  addObject(key, object) {
    this.objects[key] = object;
    this.scene.add(object.getMesh());
    return object;
  }

  /**
   * Remove an object from the objects list and the scene
   * @param {string} key - The key whose value is the object to remove
   * @returns The object that was removed
   */
  removeObject(key) {
    const object = this.objects[key];
    this.scene.remove(object.getMesh());
    delete this.objects[key];
    return object;
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.uniforms.u_time.value += 0.05;

    Object.values(this.objects).forEach((object) => {
        object.update();
    });

    this.sun.getMesh().position.x += 0.09 * Math.sin(0.08 * this.uniforms.u_time.value);
    this.uniforms.u_sunLightPos.value = this.sun.getMesh().position;

    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }
}

export default App
