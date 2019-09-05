class Slider {
	constructor(elementSelector, delay) {
        this.delay = delay;
        let position;
        this.position = position;
		this.isPaused = false;
        this.slides = document.querySelectorAll(elementSelector);
        this.slideLength = document.querySelectorAll(elementSelector).length -1;
        
		document.getElementById('prev').addEventListener('click', this.previous);
		document.getElementById('next').addEventListener('click', this.next);
		document.getElementById('stop').addEventListener('click', this.togglePause);
        document.addEventListener('keydown', this.handleKeyboard);
        this.init()
	}

    // Methodes
    
    //Initialisation
	init() {
		// ajout de l'attribut position
		for(let i = 0; i < this.slides.length; i++) {
            this.slides[i].setAttribute('position', i);    
        }
        // Initialisation du premier Slide
        this.slides[0].classList.add('active');
		// Initialisation du timer
		this.timer = setInterval(this.next, this.delay);
	}

	switchSlide(position) {
		if(this.isPaused === false) {
			// suppression des classes "actives"
			for(var i = 0; i < this.slides.length; i++) {
				this.slides[i].classList.remove('active');
			}
			// changement de slide
			this.slides[position].classList.add('active');
		}
	}

	next = e => {
		let currentSlide = document.getElementsByClassName('active')[0];
		let currentPosition = parseInt(currentSlide.getAttribute('position'));
		let nextPosition = currentPosition+1;
		if(nextPosition > (this.slides.length-1)) nextPosition = 0;
		this.switchSlide(nextPosition);
	}

	previous = e => {
		let currentSlide = document.getElementsByClassName('active')[0];
		let currentPosition = parseInt(currentSlide.getAttribute('position'));
		let previousPosition = currentPosition-1;
		if(previousPosition < 0) previousPosition = (this.slides.length-1);
		this.switchSlide(previousPosition);
	}

	togglePause = e => {
		if(this.isPaused === false) {
            clearInterval(this.timer)
            this.isPaused = true;
            document.getElementsByClassName('active')[0].style.opacity = "0.7"
            document.getElementById("stop").style.background = "lightgrey"
            document.getElementById("stop").style.color = "#333333"
		} else {
            clearInterval(this.timer)
            this.isPaused = false;
            document.getElementsByClassName('active')[0].style.opacity = "1"
            document.getElementById("stop").style.background = "#ff0000"
            document.getElementById("stop").style.color = "#fff"
            setInterval(this.next, this.delay)
        }
	}

	handleKeyboard = e => {
		if(e.keyCode == "37") {
            clearInterval(this.timer)
            setInterval(this.next, this.delay)
            this.previous();
		} else if (e.keyCode =="39") {
            this.next()
            // setInterval(this.next, this.delay)
			
		}
	}
}

const slider = new Slider(".mySlides", 5000)