varying vec3 Normal;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 diffusecolor = vec3(sin(u_time * 0.5) * st.x, st.y, 0.5 + 0.05 * sin(u_time));
    gl_FragColor=vec4(0.6 * diffusecolor, 1.0);
}