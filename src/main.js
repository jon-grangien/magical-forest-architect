import App from './App';
import ShadedSphere from './Objects/ShadedSphere/';
import * as THREE from 'three';

let app = new App();

function onWindowResize() {
  app.renderer.setSize(window.innerWidth, window.innerHeight);
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.camera.updateProjectionMatrix();
  app.uniforms.u_resolution.value.x = app.renderer.domElement.width;
  app.uniforms.u_resolution.value.y = app.renderer.domElement.height;
}

window.addEventListener( 'resize', onWindowResize, false );

app.addObject(new ShadedSphere({
    radius: 5,
    widthSegments: 32,
    heightSegments: 32,
  },
  app.uniforms
));

// Regular reference sphere
const regularGeometry = new THREE.SphereGeometry(5, 32, 32);
const regularMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
const sphere = new THREE.Mesh(regularGeometry, regularMaterial);
sphere.position.set(0.0, 5.0, -7.0);
app.scene.add(sphere);
