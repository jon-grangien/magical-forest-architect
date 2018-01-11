uniform float u_time;
varying vec2 vUv;

void main() {
  vec3 color = vec3(0.7, 0.7, 1.0);
  color += 0.5 * abs(sin(1.4 * u_time));
  gl_FragColor = vec4(color, 0.4);
}
