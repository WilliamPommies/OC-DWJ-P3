class Map{
    constructor(contract) {
        this.mymap = L.map('mapid').setView([45.7634137, 4.86], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoid2lsbHBvbW1pZXMiLCJhIjoiY2p3ZzdtdGdiMDd0NDQ0bzJ3dnMyamo3diJ9.gZBoS6dOuthMKXF5Ptk5yw'
        }).addTo(this.mymap);

        this.url = contract
        
        this.booking()
        this.display()
    }


    display() {
        ajaxGet(this.url, (reponse) => {
            let results = JSON.parse(reponse);

            for (let i = 0; i < results.length; i++) {
                const station = results[i];
                const marker = L.marker([station.position.lat,station.position.lng])
                marker.options.station = station
                marker.addTo(this.mymap)
                marker.addEventListener('click', ()=> {
                    //réinitialisation du canvas en cas de reservation lors d'une réservation en cours
                    const context = canvas.getContext("2d")
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    //Affichage du panneau latéral
                    if(document.getElementById("infoStation").style.display == "none"){
                        document.getElementById("infoStation").style.display = "initial"
                    }
                    //Renommage du status de la station en Français
                    let status
                    if (station.status == "OPEN") {
                        status = "Ouverte"
                    } else if (station.status == "CLOSED") {
                        status = "Fermée"
                    }
                    //Affichage des informations stations
                    let stationNameField = document.getElementById("stationName")
                    let adresseField = document.getElementById("adress")
                    let nbrePlacesField = document.getElementById("slotNumber")
                    let nbreVelosField = document.getElementById("bikeCounter")
                    let stationStatusField = document.getElementById("stationStatus")

                    stationNameField.textContent = station.name
                    adresseField.textContent = station.address
                    nbrePlacesField.textContent = station.available_bike_stands
                    nbreVelosField.textContent = station.available_bikes
                    stationStatusField.textContent = status
                    //affichage du bouton "réserver"    
                    const bookingButton = document.getElementById("bookingButton")
                    bookingButton.style.display = "initial"

                })

            }
        })
    }

    booking() {
        //vérification des vélos dans la station
        const bookingButton = document.getElementById("bookingButton")
        bookingButton.addEventListener("click", () => {
            let bikeCount = document.getElementById("bikeCounter").textContent
            let stationStatus = document.getElementById("stationStatus").textContent
            if(bikeCount <= 0) {
                alert("Aucun vélo n'est disponible, veuillez trouver une autre station")
            } else if (stationStatus == "Fermée") {
                alert("Cette station est actuellement fermée")
            } else {
                //affichage et suppression des boutons
                document.getElementById("bookingButton").style.display = "none"  
                document.getElementById("booking").style.display = "initial"

                //recupération des données du Local Storage
                let autoCompName = document.getElementById("inputName")
                let autoCompFirstname = document.getElementById("inputFirstname")
                
                if(localStorage){
                    autoCompName.value = localStorage.getItem("nom")
                    autoCompFirstname.value = localStorage.getItem("prenom")
                } else {
                    autoCompName.value = ""
                    autoCompFirstName.value = ""
                }

                //verification des champs vides
                const bookingStepTwo = document.getElementById("formButton");
                bookingStepTwo.addEventListener("click", () =>{
        
                            
                    if (autoCompName.value =="" && autoCompFirstname.value =="") {
                        alert("Merci de renseigner le formulaire")
                    } else if (autoCompName.value =="" || autoCompFirstname.value =="" ){
                        alert("il semblerait que vous ayez oublié de renseigner un champ")
                    } else {
                        let userNameField = document.getElementById("inputName").value
                        let userFirstnameField = document.getElementById("inputFirstname").value

                        //enregistrement dans le Local Storage
                        localStorage.setItem("nom", userNameField)
                        localStorage.setItem("prenom", userFirstnameField)
                        //affichage et masquage des boutons
                        document.getElementById("canvasBlock").style.display = "initial"
                        document.getElementById("booking").style.display = "none"
                        document.getElementById("finalButton").style.display = "initial"
                        document.getElementById("canvas").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                    }
                })
            }
        })
    }
}

const map = new Map("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d49e8e530f37f24548fcc5554dbd0464145dbb47")