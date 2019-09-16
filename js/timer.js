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
        //récupération du Timestamp
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
        //récupération des données de temps
        if (!this.startDate) {
            const now = new Date()
            this.startDate = now.getTime()
            sessionStorage.setItem("startDate", this.startDate)
        } 
  
        const updateTime  = ()=>{
          const remainingTime = this.getRemainingTime()
  
          if(remainingTime===0) {
              //arrêt du timer à la fin du compte à rebours
              clearInterval(this.interval)
              //Supression des données enregistrées et masquage de l'encart en fin de compte à rebours
              document.getElementById("timerBlock").style.display = "none"
              sessionStorage.removeItem("startDate")
              sessionStorage.removeItem("currentStation")
              sessionStorage.removeItem("bikes")
              document.getElementById("panel").style.border = "0px"
             
          
          }
          //initialisation du timer
          this.render(remainingTime)
      }
          updateTime()
          this.interval = setInterval(updateTime, 1000)
    }
  
    render(remainingTime) {
        //conversion du temps au format min:sec
      let minutes = Math.floor(remainingTime / 60000);
      let seconds = Math.floor((remainingTime % 60000) / 1000).toFixed(0);
        //affichage textuel
          if (isNaN(minutes) && isNaN(seconds)) {
              this.el.textContent = " "
          } else if(minutes >= 1) {
              this.el.textContent  = "Vous avez réservé un vélo sur la station "+ sessionStorage.getItem("currentStation") + " - "+ minutes + "m:" + seconds + "s restantes avant expiration de la réservation"            
          }else if(seconds <= 0) {
              this.el.textContent  = "Réservation expirée"            
          } else {
              this.el.textContent = "Vous avez réservé un vélo sur la station "+ sessionStorage.getItem("currentStation") + " - " + seconds + "s restantes avant expiration de la réservation"
          }
      }   
  }
  

  //lancement du timer
  let timer = new Timer("timer", 1200000)
  
  
  
  
  function finalePhase(){
      //réinitialisation du timer en cas de nouvelle réservation
      sessionStorage.removeItem("startDate") 
      clearInterval(timer.interval)
      clearInterval(timer.updateTime)
      // initialisation du timer
      timer = new Timer("timer", 1200000)
      // enregistrement des information
      const currentStation = document.getElementById("stationName").textContent
      sessionStorage.setItem("currentStation", currentStation)
      const bikes = parseInt(document.getElementById("bikeCounter").textContent)
      sessionStorage.setItem("bikes", bikes)
      // affichage
      document.getElementById("timerBlock").style.display = "initial"
      document.getElementById("finalStep").style.backgroundColor = ""
      document.getElementById("panel").style.border = "4px red dashed"  
      document.getElementById("bikeCounter").textContent = sessionStorage.getItem("bikes") - 1
      document.getElementById("canvasBlock").style.display = "none"
      // lancement du timer
      timer.getRemainingTime()
      timer.run()
  }
  
  //annulation d'une reservation
  function cancel(){
      if(sessionStorage.getItem("startDate") > 1){
          // arrêt du timer
           clearInterval(timer.interval)
           clearInterval(timer.updateTime)
          //  réaffichage du nombre de vélos initial
           document.getElementById("bikeCounter").textContent = sessionStorage.getItem("bikes")
          // suppression des informations stockées
          sessionStorage.removeItem("startDate")
          sessionStorage.removeItem("currentStation")
          sessionStorage.removeItem("bikes")
           //  suppression des éléments affichés
           document.getElementById("timerBlock").style.display = "none"
           document.getElementById("panel").style.border = "0px"
      }
  }
  
  //affichage en cas de rechargement
  function onLoad(){
      if(sessionStorage.getItem("startDate")){
          // affichage d'une alerte
          alert("vous avez une réservation en cours à la station " + sessionStorage.getItem("currentStation"))
          // affichage du timer en cours
          document.getElementById("timerBlock").style.display = "initial"
          document.getElementById("panel").style.border = "4px red dashed"  
          // nouvelle initialisation du timer
          timer.getRemainingTime()
          timer.run()   
      }
  }
  
  // Evénements au clic
  let goButton = document.getElementById("finalButton")
  goButton.addEventListener("click", finalePhase)
  
  let cancelButton = document.getElementById("cancel")
  cancelButton.addEventListener("click", cancel)
  
  window.addEventListener("load", onLoad)