varying vec3 vecNormal;

void main() {
  float intensity = pow( 0.5 - dot( vecNormal, vec3(0.0, 0.0, 0.5) ), 7.0 );
  gl_FragColor = vec4( 0.64, 0.95, 1.0, 1.0 ) * intensity;
}
