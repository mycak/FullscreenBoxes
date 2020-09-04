//Setup
// creating a new div in DOM
const newDiv = document.createElement('div');
newDiv.setAttribute('id', 'box_actual');
document.body.appendChild(newDiv);
const boxActual = document.querySelector('#box_actual');
boxActual.style.position = "absolute";

const boxes = document.querySelectorAll('.box');

let position = {};
let size = {};


//modal action stuffs
const openBox = e => {

    const clientRect = e.target.getBoundingClientRect();
    position = {
        top: e.target.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
        left: clientRect.left
    }

	size = {
		width: window.getComputedStyle(e.target).width,
		height: window.getComputedStyle(e.target).height
	}

	boxActual.style.position = "absolute";
    boxActual.style.top = position.top + 'px';
	boxActual.style.left = position.left + 'px';
	boxActual.style.height = size.height;
	boxActual.style.width = size.width;
    boxActual.style.margin = e.target.style.margin;
    document.body.classList.add('no-scroll');

	setTimeout(function() {
        boxActual.innerHTML = e.target.innerHTML;
        const classes = e.target.classList.value.split(' ');

        classes.forEach(clas => {boxActual.classList.add(clas)});

		boxActual.classList.add('growing');
		boxActual.style.height = '100vh';
		boxActual.style.width = '100vw';
        boxActual.style.top = window.pageYOffset + 'px';
		boxActual.style.left = '0';
		boxActual.style.margin = '0';
	}, 1);

	setTimeout(function(){
		boxActual.classList.remove('growing');
		boxActual.classList.add('full-screen')
	}, 1000);
};


const closeBox = function(e){

    e.currentTarget.style.height = size.height;
	e.currentTarget.style.width = size.width;
	e.currentTarget.style.top = position.top + 'px';
	e.currentTarget.style.left = position.left + 'px';
	e.currentTarget.style.margin = '0';
	e.currentTarget.classList.remove('full-screen');
    e.currentTarget.classList.add('shrinking');

	setTimeout(function(){
		while(e.target.firstChild) e.target.removeChild(e.target.firstChild);
        const classList = e.target.classList;
		while (classList.length > 0) {
			 classList.remove(classList.item(0));
		}
		e.target.style = '';
	}, 1000);
};

boxes.forEach(box => box.addEventListener('click', openBox));

boxActual.addEventListener('click', closeBox);