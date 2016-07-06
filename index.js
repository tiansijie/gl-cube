var canvas   = document.body.appendChild(document.createElement('canvas'))
var mat4     = require('gl-mat4')
var gl       = require('gl-context')(canvas, render)
var glBuffer = require('gl-buffer')

gl.enable(gl.DEPTH_TEST);

function getCube(dimension, position, rotation, color) {
  var cubeMatrix = mat4.create();
  mat4.identity(cubeMatrix, cubeMatrix);
  mat4.translate(cubeMatrix, cubeMatrix, [position.x, position.y, position.z]);
  mat4.rotateX(cubeMatrix, cubeMatrix, rotation.x);
  mat4.rotateY(cubeMatrix, cubeMatrix, rotation.y);
  mat4.rotateZ(cubeMatrix, cubeMatrix, rotation.z);

  var halfX = dimension.x / 2;
  var halfY = dimension.y / 2;
  var halfZ = dimension.z / 2;

  var vertices = [
    // Front face
    -halfX, -halfY, halfZ,
     halfX, -halfY, halfZ,
     halfX,  halfY, halfZ,
    -halfX,  halfY, halfZ,

    // Back face
    -halfX, -halfY, -halfZ,
    -halfX,  halfY, -halfZ,
     halfX,  halfY, -halfZ,
     halfX, -halfY, -halfZ,

    // Top face
    -halfX,  halfY, -halfZ,
    -halfX,  halfY,  halfZ,
     halfX,  halfY,  halfZ,
     halfX,  halfY, -halfZ,

    // Bottom face
    -halfX, -halfY, -halfZ,
     halfX, -halfY, -halfZ,
     halfX, -halfY,  halfZ,
    -halfX, -halfY,  halfZ,

    // Right face
     halfX, -halfY, -halfZ,
     halfX,  halfY, -halfZ,
     halfX,  halfY,  halfZ,
     halfX, -halfY,  halfZ,

    // Left face
    -halfX, -halfY, -halfZ,
    -halfX, -halfY,  halfZ,
    -halfX,  halfY,  halfZ,
    -halfX,  halfY, -halfZ
  ];


  var colors = [
    [color.r,  color.g,  color.b,  1.0],
    [color.r,  color.g,  color.b,  1.0],
    [color.r,  color.g,  color.b,  1.0],
    [color.r,  color.g,  color.b,  1.0],
    [color.r,  color.g,  color.b,  1.0],
    [color.r,  color.g,  color.b,  1.0]
  ];

  var generatedColors = [];

  for (j=0; j<colors.length; j++) {
    var c = colors[j];
    for (var i=0; i<4; i++) {
      generatedColors = generatedColors.concat(c);
    }
  }

  var vertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];

  var cube = {
    vertices: glBuffer(gl, new Float32Array(vertices)),
    colors: glBuffer(gl, new Float32Array(generatedColors)),
    indices: glBuffer(gl, new Uint16Array(vertexIndices), gl.ELEMENT_ARRAY_BUFFER),
    length: 36,
    matrix: cubeMatrix
  };

  return cube;
}
