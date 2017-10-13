
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 0;
var height = 0;
var currentDirection = '';
var stateHistory = [];
var lastRender = 0;

var reSize = function(){
	width = window.innerWidth * 2;
	height = window.innerHeight * 2;
	canvas.width = width;
	canvas.height = height;
}

window.onresize = reSize();
reSize();

ctx.fillStyle = '#4db6ac';

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
	40: 'down', 
	32: 'space'
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
		endGame();
	} else if (state.x < 0) {
		endGame();
	}

	if (state.y > height) {
		endGame();
	} else if (state.y < 0) {
		endGame();
	}
}

function draw(){
	ctx.clearRect(0, 0, width, height);

	stateHistory.unshift([state.x, state.y]);
	stateHistory.length = 20;
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

function startGame(){
	stateHistory.length = 0;
	for (value in state.pressedKeys) {
		if (state.pressedKeys[value]){
			state.pressedKeys[value] = false;
		}
	}
	state.x = width / 2;
	state.y = height / 2;

	window.requestAnimationFrame(loop);

	window.setTimeout(function(){
		alert('Welcome to snake! Hit ok and press a direction to start, if you collide with yourself or the walls the game is over. Enjoy!');
	}, 100);
}

function endGame(){
	alert('The end, your score was ' + stateHistory.length + ', better luck next time!');
	startGame();
}

startGame();








