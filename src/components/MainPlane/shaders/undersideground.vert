uniform sampler2D u_heightmap;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  vPos.xy = position.xy;

  float maxHeight = texture2D(u_heightmap, position.xy).r;
  if (position.z >= maxHeight) {
    vPos.z = maxHeight;
  } else {
    vPos.z = position.z;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos, 1.0);
}