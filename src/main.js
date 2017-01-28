import App from './App';
import ShadedSphere from './components/ShadedSphere/';
import MainPlane from './components/MainPlane/';
//import * as THREE from 'three';

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

app.addObject(new MainPlane({
    width: 2048,
    height: 2048,
    widthSegments: 256,
    heightSegments: 256,
  },
  app.uniforms
));

// Rotate scene for better view
app.scene.rotation.y = -30 * Math.PI / 90;
