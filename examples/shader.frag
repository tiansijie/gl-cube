precision mediump float;

varying vec4 vColor;
varying vec4 vNormal;
varying vec4 vPosition;

void main() {
  vec3 L = normalize(vec3(10.0, 10.0, 10.0) - vec3(vPosition));
  vec3 diffuse = vec3(1.0, 1.0, 1.0) * max(dot(vec3(vNormal),L), 0.0);
  diffuse = vec3(diffuse.x * vColor.x, diffuse.y * vColor.y, diffuse.z * vColor.z);
  diffuse = clamp(diffuse, 0.0, 1.0);

  gl_FragColor = vec4(diffuse, 1.0);
}
