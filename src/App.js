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
      u_purpleLightColor: new THREE.Uniform(new THREE.Vector3(1, 0, 1)),
      u_purpleLightPos: new THREE.Uniform(new THREE.Vector3())
    };

    this.createScene();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.set(0.0, 0.0, 20.0);

    let light = new THREE.PointLight( 0xFF00FF, 1.0, 100.0 );
    light.position.set(0, 0, 50.0);
    let lightBall = new THREE.Mesh( new THREE.SphereGeometry( 0.5, 16, 16 ), new THREE.MeshBasicMaterial( { color: 0xFF00FF } ) )
    light.add(lightBall);
    this.light = light;
    this.scene.add( light );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.uniforms.u_resolution.value.x = this.renderer.domElement.width;
    this.uniforms.u_resolution.value.y = this.renderer.domElement.height;
    this.uniforms.u_purpleLightPos.value = this.light.position;

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

    const lightPosFactor = 7.0;
    const posVariety = lightPosFactor * Math.sin(this.uniforms.u_time.value);
    this.light.position.set(posVariety, 0.5 * posVariety, posVariety);

    this.uniforms.u_purpleLightPos.value = this.light.position;

    this.renderer.render(this.scene, this.camera);
  }

  addObject(mesh) {
    this.objects.push(mesh);
    this.scene.add(mesh.getMesh());
  }
}

export default App
