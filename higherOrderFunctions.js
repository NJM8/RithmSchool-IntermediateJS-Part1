
// Let's try to write a function called each which accepts two parameters: an array and a callback function. The each function should loop over the array passed to it and run the callback function on each element in it.

function each(arr, fn){
	for (let i = 0; i < arr.length; i++) {
		fn(arr[i]);
	}
}

each([1,2,3,4], function(val){
	console.log(val);
});

each([1,2,3,4], function(val){
	console.log(val * 2);
});


// Write a function called map which accepts two parameters: an array and a callback. The map function should return a new array with the result of each value being passed to the callback function. Here's an example:

function map(arr, fn){
	let newArr = [];

	for (let i = 0; i < arr.length; i++) {
		newArr.push(fn(arr[i]));
	}

	return newArr;
}

console.log(map([1,2,3,4], function(val){
	return val * 2;
}))

// Write a function called reject which accepts two parameters an array and a callback. The function should return a new array with all of the values that do not return true to the callback. Here are two examples:

function reject(arr, fn){
	let newArr = [];

	for (let i = 0; i < arr.length; i++) {
		if (!fn(arr[i])) {
			newArr.push(arr[i]);
		}
	}

	return newArr;
}

console.log(reject([1,2,3,4], function(val){
	return val > 2;
}))

console.log(reject([2,3,4,5], function(val){
	return val % 2 === 0;
}))



setTimeout(function(){
	console.log('Hello, World');
}, 1000);

let someTimer = setTimeout(function(){
	console.log('This won\'t run');
}, 1000);

clearTimeout(someTimer);

let recurringtimer = setInterval(function(){
	console.log('Hello');
}, 1000);

setTimeout(function(){
	clearTimeout(recurringtimer);
}, 3000);

// Write a function called countdown that accepts a number as a parameter and every 1000 milliseconds decrements the value and console.logs it. Once the value is 0 it should log "DONE!" and stop.

function countDown(num){
	let timer = setInterval(function(){
		num -= 1;

		if (num <= 0) {
			clearInterval(timer);
			console.log('Done!');
		} else {
			console.log(num);
		}
	}, 1000);
}

countDown(4);

// Write a function called randomGame that selects a random number between 0 and 1 every 1000 milliseconds and each time that a random number is picked, add 1 to a counter. If the number is greater than .75, stop the timer and return the number of tries it took before we found a number greater than .75.

function randomGame(){
	let count = 0;
	let game = setInterval(function(){
		let randomNum = Math.random();
		count += 1;

		if (randomNum > 0.75) {
			clearInterval(game);
			console.log(count);
		}
	}, 1000);
}

randomGame();


// Write a function called isEven which takes in a number and returns true if the number is even and returns false if it is not

function isEven(number){
	console.log(number % 2 === 0 ? true : false);
}

isEven(2);
isEven(3);

// Write a function called isOdd which takes in a number and returns true if the number is odd and returns false if it is not

function isOdd(number){
	console.log(number % 2 === 0 ? false : true);
}

isOdd(2);
isOdd(3);

// Write a function called isPrime which takes in a number and returns true if the number is a prime number (is greater than 1 and can only be divided in whole by itself and 1), otherwise returns false

function isPrime(number){
	for (let i = 2; i < number; i++) {
		if (number % i === 0) {
			return console.log(false);
		}
	}

	return console.log(number > 1);
}

isPrime(8);
isPrime(17);

// Write a function called numberFact which takes in a number and a callback and returns the result of the callback with the number passed to it
function numberFact(number, func){
	return func(number);
}

numberFact(59, isEven);
numberFact(59, isOdd);
numberFact(59, isPrime);

// Write a function called find. It should take in an array and a callback and return the first value found in the array that matches the condition.

function find(array, callback){
	for (let i = 0; i < array.length; i++) {
		if (callback(array[i])) {
			return console.log(array[i]);
		}
	}

	return console.log(undefined);
}


find([8,11,4,27], function(val){return val >= 10}); 
find([8,11,4,27], function(val){return val === 5});

// Write a function called findIndex. It should take in an array and a callback and return the index of first value found in the array that matches the condition.

function findIndex(array, callback){
	for (let i = 0; i < array.length; i++) {
		if (callback(array[i])) {
			return console.log(i);
		}
	}

	return console.log(undefined);
}

findIndex([8,11,4,27], function(val){return val >= 10});
findIndex([8,11,4,27], function(val){return val === 7});

// Write a function called specialMultiply which accepts two parameters. If the function is passed both parameters, it should return the product of the two. If the function is only passed one parameter - it should return a function which can later be passed another parameter to return the product. You will have to use closure and arguments to solve this.

function specialMultiply(a, b){
	if (arguments.length === 2) {
		return console.log(a * b);
	} else {
		return function(b) {
			return console.log(a * b);
		}
	}
}

specialMultiply(3, 4);
specialMultiply(3)(4);
specialMultiply(3);












