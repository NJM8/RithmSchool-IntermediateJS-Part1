// Given the following array, write a function called printEvens that console.logs all of the even numbers

var nestedArr = [[1,2,3],[4,5,6],[7,8],[9,10,11,12]];

function printEvens(array){
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			if (array[i][j] % 2 === 0) {
				console.log(array[i][j]);
			}
		}
	}
}

printEvens(nestedArr);

// Given the following array, write a function called sumTotal returns the sum of all numbers in the array

var nestedArr2 = [[[1,2],[3,4]],[[5,6]]];

function sumTotal(array){
	let total = 0;

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			for (let k = 0; k < array[i][j].length; k++){
				total += array[i][j][k];
			}
		}
	}

	return total;
}

console.log(sumTotal(nestedArr2));

// Given the following array, write a function called countVowels, which returns the count of all of the vowels in each string regardless of case. To see if a value is an array, you can not use typeof since that will return 'object', so one way to do this is by using the Array.isArray function.

var nestedArr3 = ['Elie', ['Matt', ['Tim']],['Colt',['Whisky',['Janey'], 'Tom']], 'Lorien'];

function countVowels(array){
	let vowelCount = 0;

	function countVowelsHelper(array){
		array.forEach(function(element){
			if (typeof element === 'string') {
				let letters = element.split('');
				let myReg = new RegExp('[aeiouAEIOU]');
				for (let i = 0; i < letters.length; i++) {
					if (myReg.test(letters[i])) {
						vowelCount += 1;
					}
				}
			} else {
				countVowelsHelper(element);
			}
		})
	}
	countVowelsHelper(array);

	return vowelCount;
}

console.log(countVowels(nestedArr3));

// Write a function called rotate which takes an array and a number, and moves each element however many spaces the number is to the right. For the value at the end of the array, rotate should move it back to the beginning.

function rotate(array, num){
	let newArray = [];
	newArray.length = array.length;

	for (let i = 0; i < array.length; i++) {
		if (i + num > array.length - 1) {
			newArray[(i + num) - array.length] = array[i];
		} else {
			newArray[i + num] = array[i];
		}
	}

	return newArray;
}

let arr = [1,2,3];

console.log(rotate(arr, 1));
console.log(rotate(arr, 2));
console.log(rotate(arr, 3));

// Write a function called makeXOGrid which takes in two parameters, rows and columns, and returns an array of arrays with the number of values in each subarray equal to the columns parameter and the number of subarrays equal to the rows parameter. The values in the sub-arrays should switch between "X" and "O"

function makeXOGrid(rows, columns){
	let XOArray = [];

	for (let i = 0; i < rows; i++) {
		XOArray.push([]);

		while (XOArray[i].length < columns) {
			XOArray[i].push('X');
			if (XOArray[i].length < columns) {
				XOArray[i].push('O');
			}
		}
	}

	return XOArray;
}

console.log(makeXOGrid(1, 4));
console.log(makeXOGrid(3, 2));
console.log(makeXOGrid(3, 3));













