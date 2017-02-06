varying vec3 vecNormal;

void main() {
  vec3 test = vec3(0.0, 0.0, 1.0);
  float intensity = pow( 0.5 - dot( vecNormal, vec3( 0.0, 0.0, 0.3 ) ), 2.0 );
  intensity = max(intensity, 0.2);
  if (intensity == 0.0)
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  else
    gl_FragColor = vec4(2.0, 2.0, 7.0, 1.0) * intensity;
}
