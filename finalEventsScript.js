
// Add the necessary code to wait for the DOM to load to make sure that anything you manipulate in the DOM has loaded. You can do this either using window.onload or adding an event listener for DOMContentLoaded.

window.onload = function(){
	// Replace the text "Change me" with "Hello World!".
	let heading = document.getElementById('change_heading');
	heading.innerHTML = 'Hello World!';

	// When a user hovers over one of the colored boxes change the text to display the color that is being hovered over.
	let selectedColorDisplay = document.querySelector('.selected');
	let colors = document.querySelector('section');
	console.log(selectedColorDisplay);
	colors.addEventListener('mouseover',function(event){
		selectedColorDisplay.innerHTML = event.target.className;
	})

	// Create a new div element.
	let newDiv = document.createElement('div');

	// Give your new div a class of purple and style it so that it has a background color of purple.
	newDiv.classList.add('purple');
	newDiv.style.backgroundColor = 'purple';

	// Append your new div to the page to the section tag.
	colors.appendChild(newDiv);
}


