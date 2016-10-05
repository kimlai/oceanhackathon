var mymap = L.map('map').setView([48.473, -4.745], 15);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA', {
    maxZoom: 18,
    }).addTo(mymap);
mymap.on('click', function (e) {
    console.log(e.latlng);
});
