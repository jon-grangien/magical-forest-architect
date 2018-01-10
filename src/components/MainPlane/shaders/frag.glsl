varying vec3 transformedNormal;
varying vec4 transformedPos;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_sunLightColor;
uniform vec3 u_sunLightPos;

void main() {
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);

  // sun light lambert
  vec3 lightColor = u_sunLightColor;
  vec3 lightDirection = normalize(transformedPos.xyz - u_sunLightPos);
  addedLights.rgb += clamp(dot(-lightDirection, transformedNormal), 0.0, 1.0) * lightColor;

  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec3 ambientColor = 0.35 * vec3(0.6, 0.9, 0.8);
  vec3 diffuse = mix(ambientColor.rgb + addedLights.rgb, ambientColor.rgb, 0.6);

  //vec4 finalColor = mix(vec4(diffusecolor, 1.0), addedLights, addedLights);
  vec4 finalColor = vec4(diffuse, 1.0);

  gl_FragColor = finalColor;
}
