class Slider {
    constructor(){
        let myTimer;
        this.myTimer = myTimer
        this.slides = document.getElementsByClassName("mySlides");
        this.dots = document.getElementsByClassName("dot");
        this.slideIndex = this.slides.length - 1;
        this.slidePosition = 0,
        this.pause = false;
        this.displayImg()
        this.currentSlide()
        this.showSlides()
        this.plusSlides()
    }

    displayImg() {
        this.showSlides(this.slidePosition);
        this.myTimer = setInterval(function(){
            this.plusSlides(1)
        }, 5000);
     }

     currentSlide(n){
        clearInterval(this.myTimer);
        this.myTimer = setInterval(function(){
            this.plusSlides( n + 1)
        }, 5000);
        this.showSlides(this.slideIndex = n)
    }

    
    showSlides(n){

        if ( n > this.slides.length) {
            this.slideIndex = 1
        }
        if (n < 1) {
            this.slideIndex = this.slides.length
        }
        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";
        }
        for (let i = 0; i < this.dots.length; i++) {
            this.dots[i].className = this.dots[i].className.replace(" active", "");
        }
        this.slides[this.slideIndex - 1].style.display = "block";
        this.dots[this.slideIndex - 1].className += " active";
    }

    plusSlides(n){
        clearInterval(this.myTimer)
        
        if (n<0){
            this.showSlides(this.slideIndex -=1);
        } else {
            this.showSlides(this.slideIndex +=1)
        }
        if (n=== -1){
            this.myTimer = setInterval(function(){
                plusSlides(n+2)
            }, 5000);
        } else {
            this.myTimer = setInterval(function(){
                plusSlides(n+1)
            }, 5000);
        }
    }

}


let sliderHeader = new Slider

window.addEventListener("load", sliderHeader.displayImg())


function touchesDirection(e){
    if(e.keyCode == "37"){
        sliderHeader.showSlides(sliderHeader.slideIndex -=1);
        clearInterval(sliderHeader.myTimer)
    } else if (e.keyCode =="39"){
        sliderHeader.showSlides(sliderHeader.slideIndex +=1)
        clearInterval(sliderHeader.myTimer)
    }
}

document.addEventListener("keydown", touchesDirection)