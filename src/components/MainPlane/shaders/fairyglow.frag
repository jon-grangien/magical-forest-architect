varying vec3 vecNormal;

void main() {
  float intensity = pow( 0.5 - dot( vecNormal, vec3(0.0, 0.0, 0.7) ), 6.0 );
  gl_FragColor = vec4( 0.64, 0.95, 0.4, 0.6 ) * intensity;
}
