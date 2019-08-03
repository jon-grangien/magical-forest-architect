varying vec3 vecNormal;
varying vec2 vUv;

uniform vec2 u_resolution;

void main() {
  float intensity = pow( 0.5 - dot( vecNormal, vec3(0.0, 0.0, 0.7) ), 6.0 );
  if (intensity > 0.1) {
    gl_FragColor = vec4( 0.64, 0.95, 0.4, 0.6 ) * intensity;
  } else {
    gl_FragColor = vec4( 0.64, 0.95, 0.4, 0.1 );
  }
}
