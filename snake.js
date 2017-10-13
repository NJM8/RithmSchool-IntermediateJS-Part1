
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 0;
var height = 0;
var currentDirection = '';
var stateHistory = [];
var length = 10;

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

var keyMap = {
	37: 'left', 
	39: 'right',
	38: 'up',
	40: 'down'
}

var oppositeDirections = {
	'left': 'right', 
	'right': 'left',
	'up': 'down',
	'down': 'up'
}

function keyDown(event){
	var key = keyMap[event.keyCode];
	if (oppositeDirections[key] === currentDirection) {
		return;
	}
	for (value in state.pressedKeys) {
		if (state.pressedKeys[value]){
			state.pressedKeys[value] = false;
		}
	}
	state.pressedKeys[key] = true;
	currentDirection = key;
}

window.addEventListener('keydown', keyDown, false);

function update(progress){
	if (state.pressedKeys.left) {
		state.x -= progress;
	}

	if (state.pressedKeys.right) {
		state.x += progress;
	}

	if (state.pressedKeys.up) {
		state.y -= progress;
	}

	if (state.pressedKeys.down) {
		state.y += progress;
	}

	if (state.x > width) {
		state.x -= width;
	} else if (state.x < 0) {
		state.x += width;
	}

	if (state.y > height) {
		state.y -= height;
	} else if (state.y < 0) {
		state.y += height;
	}
}

function draw(){
	ctx.clearRect(0, 0, width, height);

	stateHistory.unshift([state.x, state.y]);
	stateHistory.length = 200;
	stateHistory.forEach(function(element){
		ctx.fillRect(element[0] - 5, element[1] - 5, 12, 12);
	})
}

function loop(timeStamp){
	var progress = (timeStamp - lastRender) / 3;

	update(progress);
	draw();

	lastRender = timeStamp;
	window.requestAnimationFrame(loop);
}

var lastRender = 0;

window.requestAnimationFrame(loop);
