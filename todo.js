
window.onload = function(){
	let input = document.querySelector('#todoText');

	input.addEventListener('keyup', function(event){
		event.preventDefault();
		if (event.keyCode === 13) {
			document.querySelector('#addNewTodo').click();
		}
	})
	
	let addTodoButton = document.querySelector('#addNewTodo');

	addTodoButton.onclick = function(){
		let newTodoText = input.value;

		if (newTodoText === '') {
			alert('Please input a todo.');
			return;
		}

		let newTodo = document.createElement('li');
		newTodo.appendChild(document.createTextNode(newTodoText));
		let todoList = document.querySelector('#list');
		todoList.appendChild(newTodo);
		input.value = '';
		canMarkCompleted(newTodo);
	}

	let canMarkCompleted = function(todo){
		todo.addEventListener('click', function(){
			todo.style.textDecoration = 'line-through';
			canUnmarkCompleted(todo);
		})
	}

	let canUnmarkCompleted = function(todo){
		todo.addEventListener('click', function(){
			todo.style.textDecoration = '';
			canMarkCompleted(todo);
		})
	}

}