varying vec2 vUv;
uniform vec2 scale;

void main(void) {
  vUv = vec2(uv.x, 1.0 - uv.y) * scale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
