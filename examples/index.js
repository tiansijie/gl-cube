var canvas   = document.body.appendChild(document.createElement('canvas'))
var clear    = require('gl-clear')({ color: [0, 0, 0, 1] })
var gl       = require('gl-context')(canvas, render)
var glBuffer = require('gl-buffer')
var mat4     = require('gl-mat4')
var glShader = require('gl-shader')
var glslify  = require('glslify')
var createCube = require("../index.js");

var shader = glShader(gl,
  glslify('./shader.vert'),
  glslify('./shader.frag')
)

shader.attributes.aPosition.location = 0
shader.attributes.aColor.location = 1
gl.enable(gl.DEPTH_TEST);

var cube1 = createCube(
  gl,
  {
    dimension: {x: 2.0, y: 5.0, z: 2.0},
    position: {x: 3.5, y: 0.0, z: -9.0},
    rotation: {x: 0, y: Math.PI / 2, z: 0},
    color: {r: 0.8, g: 0.1, b: 0.2}
  }
);

var cubes = [];
cubes.push(cube1);

var projectionMatrix = mat4.create()

function render() {
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight
  // Clear the screen and set the viewport before
  // drawing anything
  clear(gl)
  gl.viewport(0, 0, width, height)

  // Calculate projection matrix
  mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100)

  // Bind the shader
  shader.bind()
  shader.uniforms.uProjection = projectionMatrix

  // Draw the square
  for(var i = 0; i < cubes.length; ++i) {
    var cube = cubes[i];
    shader.uniforms.uModelView = cube.matrix;
    cube.vertices.bind();
    shader.attributes.aPosition.pointer();
    cube.colors.bind();
    shader.attributes.aColor.pointer();
    cube.indices.bind();
    gl.drawElements(gl.TRIANGLES, cube.length, gl.UNSIGNED_SHORT, 0);
  }
}

// Resize the canvas to fit the screen
window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)
