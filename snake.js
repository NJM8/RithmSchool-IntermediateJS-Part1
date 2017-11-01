
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 500;
var height = 500;
var currentDirection = '';
var snake = [];
var mouse = undefined;
var playing = false;
var myGame = undefined;
var step = 20;

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

function detectCollision(){
	var snakeHead = snake[0];

	if (snakeHead[0] - 5 < mouse[0] - 5 + 20 && 
		snakeHead[0] - 5 + 20 > mouse[0] - 5 &&
		snakeHead[1] - 5 < mouse[1] - 5 + 20 &&
		snakeHead[1] - 5 + 20 > mouse[1] - 5) {
		var newBlock = snake[snake.length - 1];
		console.log(newBlock);
		if (newBlock[2] === 'left') {
			newBlock[0] -= step;
		}
		if (newBlock[2] === 'right') {
			newBlock[0] += step;
		}
		if (newBlock[2] === 'up') {
			newBlock[1] -= step;
		}
		if (newBlock[2] === 'down') {
			newBlock[1] += step;
		}
		console.log(snake);
		snake.push(newBlock);		
		length += 1;
		mouse = undefined;
	}

	// for (let i = 1; i < snake.length; i++) {
	// 	if (snakeHead[0] - 5 < snake[i][0] - 5 + 20 && 
	// 		snakeHead[0] - 5 + 20 > snake[i][0] - 5 &&
	// 		snakeHead[1] - 5 < snake[i][1] - 5 + 20 &&
	// 		snakeHead[1] - 5 + 20 > snake[i][1] - 5) {
	// 		endGame();
	// 	}
	// }
}

function keyDown(event){
	document.getElementById('message').style.display = 'none';
	var key = keyMap[event.keyCode];

	if (key === undefined) {
		return;
	}

	if (key === 'space' && !playing) {
		startGame();
	}

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

	if (snake[0].length === 2 && key !== 'space') {
		snake[0].push(key);
	}
}

window.addEventListener('keydown', keyDown, false);

function update(timeStamp){
	if (Math.round(timeStamp) % 5 === 0) {
		var previousDirection;
		var nextDirection = currentDirection;

		for (let i = 0; i < snake.length; i++) {
			previousDirection = snake[i][2];
			snake[i][2] = nextDirection;
			if (snake[i][2] === 'left') {
				snake[i][0] -= step;
			}

			if (snake[i][2] === 'right') {
				snake[i][0] += step;
			}

			if (snake[i][2] === 'up') {
				snake[i][1] -= step;
			}
			if (snake[i][2] === 'down') {
				snake[i][1] += step;
			}
			nextDirection = previousDirection;	
		}

		if (snake[0] > width || snake[0] < 0 || snake[1] > height || snake[1] < 0) {
			endGame();
		}
	} else {
		return;
	}
}

function draw(){
	ctx.clearRect(0, 0, width, height);

	snake.forEach(function(element){
		ctx.fillRect(element[0] - 5, element[1] - 5, 20, 20);
	})

	if (mouse === undefined && playing) {
		mouse = [Math.random() * width, Math.random() * height];
	}

	ctx.fillRect(mouse[0] - 5, mouse[1] - 5, 20, 20);
}

function loop(timeStamp){
	update(timeStamp);
	draw();
	detectCollision();

	myGame = requestAnimationFrame(loop);
}

function startGame(){
	snake.length = 0; 
	playing = true;

	for (value in state.pressedKeys) {
		if (state.pressedKeys[value]){
			state.pressedKeys[value] = false;
		}
	}
	state.x = width / 2;
	state.y = height / 2;
	snake[0] = [state.x, state.y];

	draw();
	
	var message = 'Welcome to snake! Try to catch the mouse. Hit ok and press a direction to start, if you collide with yourself or the walls the game is over. Press any key to start, enjoy!';
	var messageDiv = document.getElementById('message');
	messageDiv.innerText = message;
	messageDiv.style.display = 'block';

	myGame = requestAnimationFrame(loop);
}

function endGame(){
	cancelAnimationFrame(myGame);

	playing = false;

	var message = 'The end, your score was ' + snake.length + ', better luck next time! Press space to start over.';
	var messageDiv = document.getElementById('message');
	messageDiv.innerText = message;
	messageDiv.style.display = 'block';

	snake.length = 0;
	mouse = undefined;
}

startGame();








