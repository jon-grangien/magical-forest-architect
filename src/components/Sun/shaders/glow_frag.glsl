varying vec3 vecNormal;

void main() {
  float intensity = pow( 0.7 - dot( vecNormal, vec3( 0.0, 0.0, 0.5 ) ), 7.0 );
  gl_FragColor = vec4( 1.0, 0.8, 0.5, 1.0 ) * intensity;
}