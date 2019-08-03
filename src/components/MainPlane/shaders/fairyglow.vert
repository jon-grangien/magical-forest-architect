varying vec3 vecNormal;
varying vec2 vUv;

void main() {
    vecNormal = normalize( normalMatrix * normal );
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
