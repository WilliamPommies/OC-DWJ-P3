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
        this.afficher()
        this.reservation()
    }


    afficher() {
        ajaxGet(this.url, (reponse) => {
            let results = JSON.parse(reponse);

            for (let i = 0; i < results.length; i++) {
                const station = results[i];
                const marker = L.marker([station.position.lat,station.position.lng])
                marker.options.station = station
                marker.addTo(this.mymap)
                marker.addEventListener('click', function(e) {

                    const context = canvas.getContext("2d")
                    context.clearRect(0, 0, canvas.width, canvas.height)

                    if(document.getElementById("infoStation").style.display == "none"){
                        document.getElementById("infoStation").style.display = "initial"
                    }
                    let status
                    if (station.status == "OPEN") {
                        status = "Ouverte"
                    } else if (station.status == "CLOSED") {
                        status = "Fermée"
                    }
                    
                    let stationNameField = document.getElementById("stationName")
                    let adresseField = document.getElementById("adresse")
                    let nbrePlacesField = document.getElementById("nbrePlaces")
                    let nbreVelosField = document.getElementById("nbreVelos")
                    let statusStationField = document.getElementById("statusStation")

                    stationNameField.textContent = station.name
                    adresseField.textContent = station.address
                    nbrePlacesField.textContent = station.available_bike_stands
                    nbreVelosField.textContent = station.available_bikes
                    statusStationField.textContent = status    
                    const reservButton = document.getElementById("reservbutton")
                    if (reservButton) {
                    reservButton.style.display = "initial"
                    }

                })

            }
        })
    }

    reservation() {
        let bookingStepOne = document.getElementById("reservbutton")
        bookingStepOne.addEventListener("click", () => {
            let veloDispo = document.getElementById("nbreVelos").textContent
            let statusStation = document.getElementById("statusStation").textContent
            if(veloDispo <= 0) {
                alert("Aucun vélo n'est disponible, veuillez trouver une autre station")
            } else if (statusStation == "Fermée") {
                alert("Cette station est actuellement fermée")
            } else {
                //affichage et suppression des boutons
                document.getElementById("reservbutton").style.display = "none"  
                document.getElementById("reservation").style.display = "initial"

                //recupération des données du Local Storage
                let autoCompNom = document.getElementById("inputNom")
                let autoCompPrenom = document.getElementById("inputPrenom")
                
                if(localStorage){
                    autoCompNom.value = localStorage.getItem("nom")
                    autoCompPrenom.value = localStorage.getItem("prenom")
                } else {
                    autoCompNom.value =""
                    autoCompPrenom.value =""
                }


                const bookingStepTwo = document.getElementById("formButton");
                bookingStepTwo.addEventListener("click", () =>{
        
                    //verification des champs vides        
                    if (autoCompNom.value =="" && autoCompPrenom.value =="") {
                        alert("Merci de renseigner le formulaire")
                    } else if (autoCompNom.value =="" || autoCompPrenom.value =="" ){
                        alert("il semblerait que vous ayez oublié de renseigner un champ")
                    } else {
                        let champNom = document.getElementById("inputNom").value
                        let champPrenom = document.getElementById("inputPrenom").value

                        
                        localStorage.setItem("nom", champNom)
                        localStorage.setItem("prenom", champPrenom)
                        document.getElementById("canvasBloc").style.display = "initial"
                        document.getElementById("reservation").style.display = "none"
                        document.getElementById("finalButton").style.display = "initial"
                        document.getElementById("canvas").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                    }
                })
            }
        })
    }
}

const map = new Map("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d49e8e530f37f24548fcc5554dbd0464145dbb47")