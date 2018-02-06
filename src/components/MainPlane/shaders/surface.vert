uniform sampler2D u_heightmap;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPos.xy = position.xy;
  vPos.z = texture2D(u_heightmap, uv.xy).r;
  vNormal = texture2D(u_heightmap, uv.xy).gba;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
}