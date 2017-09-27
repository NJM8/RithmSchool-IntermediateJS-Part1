
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




