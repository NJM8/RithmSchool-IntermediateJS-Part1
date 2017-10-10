
window.onload = function(){
	let addTodoButton = document.querySelector('#addNewTodo');

	function markCompleted(todo){
		todo.style.textDecoration = 'line-through';
	}

	addTodoButton.onclick = function(){
		let input = document.querySelector('#todoText');
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


	}
}