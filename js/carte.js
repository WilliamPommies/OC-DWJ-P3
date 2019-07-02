   var mymap = L.map('mapid').setView([45.7634137, 4.86], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoid2lsbHBvbW1pZXMiLCJhIjoiY2p3ZzdtdGdiMDd0NDQ0bzJ3dnMyamo3diJ9.gZBoS6dOuthMKXF5Ptk5yw'
}).addTo(mymap);

function ajaxGet(url, callback) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

function afficher(reponse) {
    const results = JSON.parse(reponse);
    
    for (let i = 0; i < results.length; i ++) {
      const station = results[i];
      const marker = L.marker([station.position.lat,station.position.lng])
        marker.__data = station
        marker.addTo(mymap)
        console.log(marker)
      }
}



ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d49e8e530f37f24548fcc5554dbd0464145dbb47", afficher)

