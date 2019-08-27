

class Timer{
  constructor(elementSelector, delay){
      
      this.el = document.getElementById(elementSelector)
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

      this.station = document.getElementById("stationName")
      sessionStorage.setItem("station", this.station)

      const updateTime  = ()=>{
        const remainingTime = this.getRemainingTime()

        if(remainingTime===0) {
            clearInterval(this.interval)
            document.getElementById("timerBloc").style.display = "none"
            sessionStorage.removeItem("startDate")
            sessionStorage.removeItem("stationReservation")
            sessionStorage.removeItem("velos")
            document.getElementById("panel").style.border = "0px"
           
        
        }
        this.render(remainingTime)
    }
        updateTime()
        this.interval = setInterval(updateTime, 1000)
  }

  render(remainingTime) {
    let minutes = Math.floor(remainingTime / 60000);
    let seconds = Math.floor((remainingTime % 60000) / 1000).toFixed(0);
        if (isNaN(minutes) && isNaN(seconds)) {
            this.el.textContent = " "
        } else if(minutes >= 1) {
            this.el.textContent  = "Vous avez reservé un vélo sur la station "+ sessionStorage.getItem("stationReservation") + " - "+ minutes + "m:" + seconds + "s restantes avant expiration de la reservation"            
        }else if(seconds <= 0) {
            this.el.textContent  = "Reservation expirée"            
        } else {
            this.el.textContent = "Vous avez reservé un vélo sur la station "+ sessionStorage.getItem("stationReservation") + " - " + seconds + "s restantes avant expiration de la reservation"
        }
    }   
}
        

const timer = new Timer("timer", 30000)


function clic(){
    const timer = new Timer("timer", 30000)
    document.getElementById("timerBloc").style.display = "initial"
    const stationReservation = document.getElementById("stationName").textContent
    sessionStorage.setItem("stationReservation", stationReservation)
    const velos = parseInt(document.getElementById("nbreVelos").textContent) - 1
    sessionStorage.setItem("velos", velos)
    document.getElementById("finalisation").style.backgroundColor = ""
    document.getElementById("panel").style.border = "4px red dashed"  
    timer.getRemainingTime()
    timer.run()
    document.getElementById("nbreVelos").textContent = sessionStorage.getItem("velos")
    document.getElementById("canvasBloc").style.display = "none"
}

let buttonElement = document.getElementById("finalButton")
buttonElement.addEventListener("click", clic)

function onLoad(){
    if(sessionStorage.getItem("startDate") === null){
        
    } else {
        alert("vous avez une reservation en cours à la station " + sessionStorage.getItem("stationReservation"))
        document.getElementById("timer").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        document.getElementById("infoStation").style.display = "none"
        document.getElementById("formulaire").style.display = "none"
        document.getElementById("timerBloc").style.display = "initial"
        document.getElementById("panel").style.border = "4px red dashed"  
        timer.getRemainingTime()
        timer.run()   
    }
}

window.addEventListener("load", onLoad)