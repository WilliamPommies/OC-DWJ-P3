class Slider {
    constructor(){
        let myTimer;
        this.slideIndex = 1;
        this.myTimer = myTimer
        this.slides = document.getElementsByClassName("mySlides");
        this.dots = document.getElementsByClassName("dot");
    }

    displayImg() {
        this.showSlides(this.slideIndex);
        this.myTimer = setInterval(function(){
            this.plusSlides(1)
        }, 5000);
     }

     currentSlide(n){
        clearInterval(this.myTimer);
        this.myTimer = setInterval(function(){
            this.plusSlides( n + 1)
        }, 5000);
        this.showSlides(slideIndex = n)
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
    

}


const sliderHeader = new Slider
window.addEventListener("load", sliderHeader.displayImg())


function plusSlides(n){
    clearInterval(sliderHeader.myTimer);
    if (n<0){
        sliderHeader.showSlides(sliderHeader.slideIndex -=1);
    } else {
        sliderHeader.showSlides(sliderHeader.slideIndex +=1)
    }
    if (n=== -1){
        sliderHeader.myTimer = setInterval(function(){
            plusSlides(n+2)
        }, 5000);
    } else {
        sliderHeader.myTimer = setInterval(function(){
            plusSlides(n+1)
        }, 5000);
    }
}