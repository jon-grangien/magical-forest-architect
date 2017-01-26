varying vec3 transformedNormal;
varying vec3 transformedPos;

void main() {
  // Transform normal
  // normalMatrix: inverse transpose of modelViewMatrix
  transformedNormal = normalize(normalMatrix * normal);

  // Transform position
  //transformedPos = vec3(projectionMatrix * modelViewMatrix * vec4(variedpos, 1.0));
  transformedPos = (modelMatrix * vec4(position, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
