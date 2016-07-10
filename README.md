# gl-cube
Generate all you need to build an webgl cube based on [stack.gl](http://stack.gl/)

## how to use
```javascript

var createCube = require("gl-cube");
var cube = createCube(
	gl,
	{
		dimension: {x: 2.0, y: 5.0, z: 2.0},
		position: {x: 3.5, y: 0.0, z: -9.0},
		rotation: {x: 0, y: Math.PI / 2, z: 0},
		color: {r: 0.8, g: 0.1, b: 0.2}
	}
);


/*In your render method*/
render() {
	/*......*/
	shader.uniforms.uModelView = cube.matrix;
	cube.vertices.bind();
	shader.attributes.aPosition.pointer();
	cube.colors.bind();
	shader.attributes.aColor.pointer();
	cube.indices.bind();
	gl.drawElements(gl.TRIANGLES, cube.length, gl.UNSIGNED_SHORT, 0);
	/*......*/
}
```

## how to run demo
```
npm install
npm run start-example
```
After running ```npm start```, a wzrd server should start running on [`http://localhost:9966/`](http://localhost:9966/) Enjoy!
