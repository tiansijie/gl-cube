precision mediump float;

attribute vec3 aPosition;
attribute vec4 aColor;
attribute vec3 aNormal;

uniform mat4 uModelView;
uniform mat4 uProjection;
uniform mat4 uNormalMatrix;

varying vec4 vColor;
varying vec4 vNormal;
varying vec4 vPosition;

void main() {
  vNormal = uNormalMatrix * vec4(aNormal, 1.0);
  vPosition = uModelView * vec4(aPosition, 1.0);
  vColor = aColor;
  gl_Position = uProjection * uModelView * vec4(aPosition, 1.0);
}
