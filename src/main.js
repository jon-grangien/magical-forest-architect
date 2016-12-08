import App from './App';
import ShadedSphere from './Objects/ShadedSphere/';

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
