var mat4 = require("gl-mat4");
var glBuffer = require("gl-buffer");

function createCube(gl, cube) {
  var dimension = cube.dimension;
  var position = cube.position;
  var rotation = cube.rotation;
  var color = cube.color;

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
    [color.r,  color.g,  color.b,  color.a],
    [color.r,  color.g,  color.b,  color.a],
    [color.r,  color.g,  color.b,  color.a],
    [color.r,  color.g,  color.b,  color.a],
    [color.r,  color.g,  color.b,  color.a],
    [color.r,  color.g,  color.b,  color.a]
  ];

  var generatedColors = [];

  for (var j=0; j<colors.length; ++j) {
    var c = colors[j];
    for (var i=0; i<4; ++i) {
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

  var normals = [
    [0.0, 0.0, 1.0], // Front Side
    [0.0, 0.0, -1.0], // Back Side
    [0.0, 1.0, 0.0], // Top Side
    [0.0,-1.0, 0.0], // Bottom Side
    [1.0, 0.0, 0.0], // Right Side
    [-1.0, 0.0, 0.0] // Left Side
  ];

  var generatedNormals = [];

  for (var j=0; j<normals.length; ++j) {
    var n = normals[j];
    for (var i=0; i<4; ++i) {
      generatedNormals = generatedNormals.concat(n);
    }
  }

  var cube = {
    vertices: glBuffer(gl, new Float32Array(vertices)),
    colors: glBuffer(gl, new Float32Array(generatedColors)),
    normals: glBuffer(gl, new Float32Array(generatedNormals)),
    indices: glBuffer(gl, new Uint16Array(vertexIndices), gl.ELEMENT_ARRAY_BUFFER),
    length: 36,
    matrix: cubeMatrix
  };

  return cube;
}
module.exports = createCube;
