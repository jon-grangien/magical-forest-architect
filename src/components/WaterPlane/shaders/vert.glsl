varying vec3 vecNormal;
varying vec3 pos;

uniform float u_time;

void main() {
  pos = position;
  pos -= vec3(0.0, 0.0, 98.0);
  vecNormal = normalize( normalMatrix * normal );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
