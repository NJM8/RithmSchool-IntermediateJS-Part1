
window.onload = function(){
	let todos = [];
	let addTodoButton = document.querySelector('#addNewTodo');
	let input = document.querySelector('#todoText');

	var addNewTodo = function(newTodoText) {
		let newTodo = document.createElement('li');
		let todoList = document.querySelector('#list');

		newTodo.appendChild(document.createTextNode(newTodoText));
		todoList.appendChild(newTodo);
		input.value = '';
		canMarkCompleted(newTodo);
		console.log(todos);
	}

	var canMarkCompleted = function(todo){
		todo.title = 'Click to mark todo completed, double click to delete';
		todo.addEventListener('click', function(){
			todo.style.textDecoration = 'line-through';
			canUnmarkCompleted(todo);
		})

		todo.addEventListener('dblclick', function(){
			removeTodo(todo);
		})
	}

	var canUnmarkCompleted = function(todo){
		todo.title = 'Click to mark todo uncompleted, double click to delete';
		todo.addEventListener('click', function(){
			todo.style.textDecoration = '';
			canMarkCompleted(todo);
		})

		todo.addEventListener('dblclick', function(){
			removeTodo(todo);
		})
	}

	var removeTodo = function(todo){
		todo.remove();
		todos.forEach(function(element, index){
			if (element === todo.innerHTML) {
				todos.splice(index, 1);
			}
		})
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	if (localStorage.getItem('todos')) {
		todos = JSON.parse(localStorage.getItem('todos'));
		todos.forEach(function(element){
			addNewTodo(element);
		})
	}

	input.addEventListener('keyup', function(event){
		event.preventDefault();
		if (event.keyCode === 13) {
			document.querySelector('#addNewTodo').click();
		}
	})

	addTodoButton.onclick = function(){
		let newTodoText = input.value;

		if (newTodoText === '') {
			alert('Please input a todo.');
			return;
		}

		addNewTodo(newTodoText);

		todos.push(newTodoText);
		localStorage.setItem('todos', JSON.stringify(todos));
	}
}





