

class Timer{
  constructor(elementSelector, delay){
      
      this.el = document.querySelector(elementSelector)
      this.delay =  delay
      const oldStartRaw = sessionStorage.getItem("startDate")
      if (oldStartRaw) {
          this.startDate = parseInt(oldStartRaw)
      }
  }

  getRemainingTime(){
      const now =  new Date()
      const nowTime = now.getTime()
      const diff = (this.startDate + this.delay) - nowTime

      if (diff <= 0){
          return 0
      } else {
          return diff
          
      } 
  }

  run(){
      if (!this.startDate) {
          const now = new Date()
          this.startDate = now.getTime()
          sessionStorage.setItem("startDate", this.startDate)
      } 


      const updateTime  = ()=>{
        const remainingTime = this.getRemainingTime()
        if(remainingTime===0) {
            clearInterval(this.interval)
            sessionStorage.removeItem("startDate")
            sessionStorage.removeItem("stationReservation")
            sessionStorage.removeItem("velos")

            document.getElementById("button").style.display = "initial"
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height)
        }
        this.render(remainingTime)
    }
        updateTime()
        this.interval = setInterval(updateTime, 1000)
  }

  render(remainingTime) {
    let minutes = Math.floor(remainingTime / 60000);
    let seconds = Math.floor((remainingTime % 60000) / 1000).toFixed(0);
        if(minutes >= 1) {
            this.el.textContent  = "Vous avez reservé un vélo sur la station "+ sessionStorage.getItem("stationReservation") + " - "+ minutes + "m:" + seconds + "s restantes avant expiration de la reservation"            
        }else if(seconds <= 0) {
            this.el.textContent  = null
        } else {
            this.el.textContent = "Vous avez reservé un vélo sur la station "+ sessionStorage.getItem("stationReservation") + " - " + seconds + "s restantes avant expiration de la reservation"
        }
    }   
}
        
    


const timer = new Timer("#timer", 14000)


function clic(){
    timer.getRemainingTime()
    timer.run()
    const stationReservation = document.getElementById("stationName").textContent
    sessionStorage.setItem("stationReservation", stationReservation)
    const velos = parseInt(document.getElementById("nbreVelos").textContent) - 1
    sessionStorage.setItem("velos", velos)
    document.getElementById("nbreVelos").textContent = sessionStorage.getItem("velos")
    scrollTo(document.getElementById("mapid"))    
    document.getElementById("canvas").style.display = "none"
    document.getElementById("finalButton").style.display = "none"
    document.getElementById("indicCanvas").style.display = "none"
}

let buttonElement = document.getElementById("finalButton")
buttonElement.addEventListener("click", clic)

function onLoad(){
    if(sessionStorage.getItem("startDate") === null){
        console.log("ok")
    } else {
        alert("vous avez une reservation en cours à la station " + sessionStorage.getItem("stationReservation"))
        timer.getRemainingTime()
        timer.run()
        scrollTo(document.getElementById("mapid"))
       
    }
}

window.addEventListener("load", onLoad)