varying vec3 transformedNormal;
varying vec3 transformedPos;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_purpleLightColor;
uniform vec3 u_purpleLightPos;

void main() {
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
  vec3 lightColor = u_purpleLightColor;
  vec3 lightDirection = normalize(transformedPos - u_purpleLightPos);
  addedLights.rgb += clamp(dot(-lightDirection, transformedNormal), 0.0, 1.0) * lightColor;

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 diffusecolor = 0.2 * vec3(sin(u_time * 0.5) * st.x, st.y, 0.5 + 0.05 * sin(u_time));

  vec4 finalColor = mix(vec4(diffusecolor, 1.0), addedLights, addedLights);

  gl_FragColor = finalColor;
}