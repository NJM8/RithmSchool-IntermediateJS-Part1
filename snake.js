
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 0;
var height = 0;

var reSize = function(){
	width = window.innerWidth * 2;
	height = window.innerHeight * 2;
	canvas.width = width;
	canvas.height = height;
}

window.onresize = reSize();
reSize();

ctx.fillStyle = 'red';

var state = {
	x: width / 2, 
	y: height / 2, 
	pressedKeys: {
		left: false, 
		right: false, 
		up: false, 
		down: false
	}
}

function update(progress){
	state.x += progress;

	if (state.x > width) {
		state.x -= width;
	}
}

function draw(){
	ctx.clearRect(0, 0, width, height);
	ctx.fillRect(state.x - 5, state.y - 5, 12, 12);
}

function loop(timeStamp){
	var progress = (timeStamp - lastRender) / 3.5;

	update(progress);
	draw();

	lastRender = timeStamp;
	window.requestAnimationFrame(loop);
}

var lastRender = 0;

window.requestAnimationFrame(loop);
