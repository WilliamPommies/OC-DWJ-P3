let boutonElt = document.getElementById("button")
boutonElt.addEventListener("click", function(){
    let veloDispo = document.querySelector("#nbreVelos").textContent
    if (veloDispo < 1) {
        alert("Il n'y a plus de vélo disponible, veuillez choisir une autre station")
    } else {
        document.getElementById("button").style.display = "none"
        document.getElementById("formulaire").style.display ="initial"
        


        //Nom
        // let champNom = document.createElement("div")
        // champNom.id = "champNom"
        // let indicNom = document.createElement("label")
        // indicNom.id = "indicNom"
        // indicNom.textContent ="Votre Nom : "
        // let formNom = document.createElement("input")
        // formNom.type = "text"
        let formNom = document.getElementById("formNom")
        formNom.value = localStorage.getItem("nom")//prérémplissage du champ

        //Prenom
        // let champPrenom = document.createElement("div")
        // champPrenom.id = "champPrenom"
        // let indicPrenom = document.createElement("label")
        // indicPrenom.id = "indicPrenom"
        // indicPrenom.textContent ="Votre Prénom : "
        // let formPrenom = document.createElement("input")
        // formPrenom.type = "text"
        let formPrenom = document.getElementById("formPrenom")
        formPrenom.value =localStorage.getItem("prenom")//prérémplissage du champ
        // formPrenom.id = "formPrenom"
        // formPrenom.textContent = ""

        //Bouton suivant
        let suivant = document.createElement("button")
        suivant.id = "suivantButton"
        suivant.textContent="Suivant"



        document.getElementById("formulaire").appendChild(champNom)
        document.getElementById("champNom").appendChild(indicNom)
        document.getElementById("champNom").appendChild(formNom)
        document.getElementById("formulaire").appendChild(champPrenom)
        document.getElementById("champPrenom").appendChild(indicPrenom)
        document.getElementById("champPrenom").appendChild(formPrenom)
        document.getElementById("formulaire").appendChild(suivant)

        document.getElementById("champNom").style.marginBottom = "15px"
        document.getElementById("champPrenom").style.marginBottom = "15px" 



        const goButton = document.getElementById("suivantButton");
        goButton.addEventListener("click", function(){

            //verification des champs vides        
            if (formNom.value ==="" && formPrenom.value ==="") {
                alert("Merci de renseigner le formulaire")
            } else if (formNom.value ==="" || formPrenom.value ==="" ){
                alert("il semblerait que vous ayez oublié de renseigner un champ")
            } else {
                document.getElementById("formulaire").style.display = "none"
                document.getElementById("canvas").style.display = "initial"
                document.getElementById("reservation").removeChild("suivantButton")
                document.getElementById("finalButton").style.display = "none"
                document.getElementById("indicCanvas").style.display = "initial"
            }

            //Stockage des données
            const nomUser = formNom.value
            const prenomUser = formPrenom.value
            localStorage.setItem("nom", nomUser)
            localStorage.setItem("prenom", prenomUser)


            console.log("nom: " + localStorage.getItem("nom"))
            console.log("prenom: " + localStorage.getItem("prenom"))

           

            

        })
    }
})

