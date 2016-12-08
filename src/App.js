import * as THREE from 'three';

/**
 * Main class
 */
class App {
  constructor() {
    this.objects = [];

    this.uniforms = {
      u_time: { type: "f", value: 1.0 },
      u_resolution: { type: "v2", value: new THREE.Vector2() },
    };

    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.z = 20;

    let light = new THREE.PointLight( 0xff0000, 10, 1000 );
    light.position.set( 0, 0, 20 );
    this.scene.add( light );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;

    this.render();
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    this.objects.forEach((object) => {
      object.update();
    });

    this.uniforms.u_time.value += 0.05;

    this.renderer.render(this.scene, this.camera);
  }

  addObject(mesh) {
    this.objects.push(mesh);
    this.scene.add(mesh.getMesh());
  }
}

export default App
