class Slider {
	constructor(elementSelector, delay) {
        this.delay = delay
		this.isPaused = false
        this.slides = document.querySelectorAll(elementSelector)
		this.slideLength = document.querySelectorAll(elementSelector).length -1
		
        
		document.getElementById('prev').addEventListener('click', e=>this.previous(e))
		document.getElementById('next').addEventListener('click', e=>this.next(e))
		document.getElementById('stop').addEventListener('click', e=>this.togglePause(e))
		document.addEventListener('keydown', e=>this.handleKeyboard(e))
		this.init()
		this.handleKeyboard()
		


	}

    // Methodes
    
    //Initialisation
	init() {
		// ajout de l'attribut position
		for(let i = 0; i < this.slides.length; i++) {
            this.slides[i].setAttribute("position", i) 
        }
        // Initialisation du premier Slide
        this.slides[0].classList.add("active")
		// Initialisation du timer
		this.timer = setInterval(e => this.next(e), this.delay)
	}

	switchSlide(position) {
		if(this.isPaused === false) {
			// suppression des classes "actives"
			for(var i = 0; i < this.slides.length; i++) {
				this.slides[i].classList.remove("active")
			}
			// changement de slide
			this.slides[position].classList.add("active")
		}
	}

	next(e) {
		if(this.timer){
			clearInterval(this.timer)
			let currentSlide = document.getElementsByClassName("active")[0]
			let currentPosition = parseInt(currentSlide.getAttribute("position"))
			let nextPosition = currentPosition+1;
			if(nextPosition > (this.slides.length-1)) nextPosition = 0
			this.switchSlide(nextPosition)
			this.timer = setInterval(e => this.next(e), this.delay)
		} else {
			this.timer = setInterval(e => this.next(e), this.delay)
		}
	}

	previous(e) {
		clearInterval(this.timer)
		let currentSlide = document.getElementsByClassName('active')[0]
		let currentPosition = parseInt(currentSlide.getAttribute('position'))
		let previousPosition = currentPosition-1
		if(previousPosition < 0) previousPosition = (this.slides.length-1)
		this.switchSlide(previousPosition)
		this.timer = setInterval(e => this.next(e),this.delay)
	}

	togglePause(e){
		if(this.isPaused === false) {
			clearInterval(this.timer)
			this.isPaused = true;
			document.getElementsByClassName('active')[0].style.opacity = "0.8"
			document.getElementById("stop").style.background = "lightgrey"
			document.getElementById("stop").style.color = "#333333"
		} else {
			clearInterval(this.timer)
			this.isPaused = false;
			document.getElementsByClassName('active')[0].style.opacity = "1"
			document.getElementById("stop").style.background = "#ff0000"
			document.getElementById("stop").style.color = "#fff"
			this.timer = setInterval(e => this.next(e), this.delay);
		}
	}

	handleKeyboard(e){
			if(e.keyCode == "37") {
				clearInterval(this.timer)
				this.isPaused = false;
				this.previous(e)
			} else if (e.keyCode =="39") {
				clearInterval(this.timer)
				this.isPaused = false;
				this.next(e)
			}
		}


}

const slider = new Slider(".mySlides", 5000)