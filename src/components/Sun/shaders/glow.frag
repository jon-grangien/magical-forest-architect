varying vec3 vecNormal;

void main() {
  float intensity = pow( 0.4 - dot( vecNormal, vec3(0.0, 0.0, 0.7) ), 4.0 );
  gl_FragColor = vec4( 0.64, 0.95, 1.0, 1.0 ) * intensity;
}
