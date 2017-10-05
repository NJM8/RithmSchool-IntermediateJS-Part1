
// Add the necessary code to wait for the DOM to load to make sure that anything you manipulate in the DOM has loaded. You can do this either using window.onload or adding an event listener for DOMContentLoaded.

window.onload = function(){
	// Replace the text "Change me" with "Hello World!".
	let heading = document.getElementById('change_heading');
	heading.innerHTML = 'Hello World!';

	// When a user hovers over one of the colored boxes change the text to display the color that is being hovered over.
	let selectedColorDisplay = document.querySelector('.selected');
	let colors = document.querySelector('section');
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

	let startButton = document.querySelector('.race-button');
	let car1 = document.querySelector('.car1');
	let car2 = document.querySelector('.car2');
	car1.style.marginLeft = 0;
	car2.style.marginLeft = 0;

	function resetRace(car1, car2){
		clearTimeout(car1.timer);
		clearTimeout(car2.timer);
		car1.style.marginLeft = 0;
		car2.style.marginLeft = 0;
		startButton.disabled = false;
	}

	startButton.addEventListener("click", function(){
    	startButton.disabled = true;

    	car1.timer = setInterval(function(){
    		car1.style.marginLeft = parseInt(car1.style.marginLeft) + Math.random() * 60 + 'px';
    		if ((parseInt(car1.style.marginLeft) + car1.clientWidth) > window.innerWidth) {
    			alert('Car one wins!');
    			resetRace(car1, car2);
    		}
    	}, 100)

    	car2.timer = setInterval(function(){
    		car2.style.marginLeft = parseInt(car2.style.marginLeft) + Math.random() * 60 + 'px';
    		if ((parseInt(car2.style.marginLeft) + car2.clientWidth) > window.innerWidth) {
    			alert('Car two wins!');
    			resetRace(car1, car2);
    		}
    	}, 100)
	});

}









