
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
let currentDirection = 'left';
let canChangeDirection = true;
let playing = false;
let main;
let step = 20;
let maxFPS = 10;
let randomWidth = 0;
let randomHeight = 0;
let lastFrameTimeMs;
let snakeHead;
let message;

let snake = {
	body: [],

	increaseLength: function(){
		this.body.push(mouse);
	},

	stepForward: function(){
		let nextSegment = [this.body[0][0], this.body[0][1]];
		this.body.pop();
		if (currentDirection === 'left') {
			nextSegment[0] -= step;
		} else if (currentDirection === 'right') {
			nextSegment[0] += step;
		} else if (currentDirection === 'up') {
			nextSegment[1] -= step;
		} else if (currentDirection === 'down') {
			nextSegment[1] += step;
		}
		this.body.unshift(nextSegment);
	},

	initializeBody: function(){
		this.body.length = 0;
		this.body.push([canvas.width / 2, canvas.height / 2,]);
		this.body.push([canvas.width / 2 + step, canvas.height / 2]);
		this.body.push([canvas.width / 2 + step * 2, canvas.height / 2]);
		this.body.push([canvas.width / 2 + step * 3, canvas.height / 2]);
	},

	clearSnake: function(){
		this.body.length = 0;
	}
}

let mouse = {
	body: [],

	checkCollision: function(){
		for (let i = 1; i < snake.body.length; i++) {
			if (this.body[0] - 10 < snake.body[i][0] + 10 && 
				this.body[0] + 10 > snake.body[i][0] - 10 &&
				this.body[1] - 10 < snake.body[i][1] + 10 &&
				this.body[1] + 10 > snake.body[i][1] - 10) {
				this.initializeBody();
			}
		}
	},

	initializeBody: function(){
		this.body.length = 0;
		randomWidth = Math.floor(Math.random() * canvas.width - step);
		randomHeight = 	Math.floor(Math.random() * canvas.height - step);
		this.body = [randomWidth - (randomWidth % step), randomHeight - (randomHeight % step)];
		this.checkCollision();
	}, 

	clearMouse: function(){
		this.body.length = 0;
	}
}

let pressedKeys = {
	keys: {
		left: false, 
		right: false, 
		up: false, 
		down: false
	},

	resetState: function(){
		let keys = Object.keys(pressedKeys.keys);
		keys.forEach((key) => pressedKeys[key] === false);
	},

	selectRandomKey: function(){
		let keys = Object.keys(pressedKeys.keys);
		return keys[Math.floor(Math.random() * 4)];
	}
}

let keyMap = {
	37: 'left', 
	39: 'right',
	38: 'up',
	40: 'down', 
	32: 'space'
}

let oppositeDirections = {
	'left': 'right', 
	'right': 'left',
	'up': 'down',
	'down': 'up'
}

function keyDown(event){
	let key = keyMap[event.keyCode];

	if (key === undefined) {
		return;
	}

	if (oppositeDirections[key] === currentDirection) {
		return;
	} else if (canChangeDirection === true) {
		pressedKeys.resetState();
		pressedKeys.keys[key] = true;
		currentDirection = key;
		canChangeDirection = false;
	}
}

function update(){
	if (snake.body.length === 0) {
		snake.initializeBody();
	}
	if (mouse.body.length === 0) {
		mouse.initializeBody();
	}
	snake.stepForward();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#4db6ac';

	snake.body.forEach(function(element, index){
		ctx.fillRect(element[0], element[1], step, step);
	})

	ctx.fillStyle = '#b22222';
	ctx.fillRect(mouse.body[0], mouse.body[1], step, step);
}

function detectCollision(){
	snakeHead = snake.body[0];

	if (snakeHead[0] > canvas.width || snakeHead[0] < 0 || snakeHead[1] > canvas.width || snakeHead[1] < 0) {
		endGame();
		return;
	}

	if (snakeHead[0] - 10 < mouse.body[0] + 10 && snakeHead[0] + 10 > mouse.body[0] - 10 &&
		snakeHead[1] - 10 < mouse.body[1] + 10 && snakeHead[1] + 10 > mouse.body[1] - 10) {
		snake.increaseLength();	
		mouse.clearMouse();
		return;
	}

	for (let i = 1; i < snake.body.length; i++) {
		if (snakeHead[0] - 10 < snake.body[i][0] + 10 && 
			snakeHead[0] + 10 > snake.body[i][0] - 10 &&
			snakeHead[1] - 10 < snake.body[i][1] + 10 &&
			snakeHead[1] + 10 > snake.body[i][1] - 10) {
			endGame();
		}
	}
}

function mainLoop(timestamp){
	if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
		main = requestAnimationFrame(mainLoop);
		return;
	} else {
		update();
		detectCollision();
		draw();
		canChangeDirection = true;
	}

	lastFrameTimeMs = timestamp;

	main = requestAnimationFrame(mainLoop);
}

function startGame(){
	pressedKeys.resetState();
	currentDirection = 'left';
	
	message = 'Welcome to snake! Try to catch the mouse. Hit space to start, if you collide with yourself or the walls the game is over. Enjoy!';
	window.alert(message);
	playing = true;
	main = requestAnimationFrame(mainLoop);
}

function endGame(){
	cancelAnimationFrame(mainLoop);
	let message = 'The end, your score was ' + snake.body.length + ', better luck next time!';

	playing = false;
	mouse.clearMouse();
	snake.clearSnake();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	window.alert(message);
	startGame();
}

window.addEventListener('keydown', keyDown, false);

startGame();







