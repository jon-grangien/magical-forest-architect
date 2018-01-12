varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPos = position;
  vNormal = normal;
  // gl_Position = vec4(position.xy, 0.0, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
