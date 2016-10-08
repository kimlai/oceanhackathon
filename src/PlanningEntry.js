import React, { Component } from 'react';

import data_pnm from './pnm_iroise.json'
import data_n2000_1 from './n2000_zps.json'
import data_n2000_2 from './n2000_sic.json'


class Planning extends Component {
    constructor(props) {
        super(props);
        const planning = JSON.parse(window.localStorage.getItem('planning')) || [];
        const entry = planning[0] || null;
        this.state = {
            entry: entry
        };
    }

    componentWillUnmount() {
        this.map.remove();
        const mapElement = document.getElementById('map-container');
        mapElement.remove();
    }


    componentWillMount() {
        const position = this.state.entry.location.location;
        const mapContainer = document.createElement('div');
        mapContainer.id = 'planning-entry-map-container';
        document.body.appendChild(mapContainer);
        const map = window.L.map('planning-entry-map-container', { scrollWheelZoom: true }).setView(position, 15);
        var mapbox = window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/kimlai/city4g5cd00b22iqiwvyfdlv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18 })
        .addTo(map);

        function popupNatura2000(feature, layer) {
        // does this feature have a property named popupContent?
        var html_content = feature.properties.ORIG_NAME;
            layer.bindPopup(html_content);
            layer.setStyle({fillColor :'red', stroke: false}) 
        }

        function popupNPM(feature, layer) {
        // does this feature have a property named popupContent?
        var html_content = feature.properties.ORIG_NAME;
            layer.bindPopup(html_content);
            layer.setStyle({fillColor :'blue', stroke: false}) 
        }
       // $.getJSON("test.geojson",function(data){
        // add GeoJSON layer to the map once the file is loaded
        // polygon = window.L.geoJson(data).addTo(map);
        var pnm = window.L.geoJSON(data_pnm, {
            onEachFeature: popupNPM
        }).addTo(map);
        var natura2000_ZPS = window.L.geoJSON(data_n2000_1, {
            onEachFeature: popupNatura2000
        }).addTo(map);
        var natura2000_SIC = window.L.geoJSON(data_n2000_2, {
            onEachFeature: popupNatura2000
        }).addTo(map);
        //});


        //La boite en haut à droite pour choisir quelle layers afficher.

        var baseMaps = {
            "mapbox" : mapbox
        };

        var overlayMaps = {
            "parc naturel maritime" : pnm,
            "natura 2000 Oiseaux" : natura2000_ZPS,
            "natura 2000 Habitats" : natura2000_SIC
        };
        window.L.control.layers(baseMaps, overlayMaps).addTo(map);

        // fin des modifs chojnacki


        this.map = map;
    }

    render() {
        const entry = this.state.entry;
        return (
            <div className='single-planning-entry-container'>
                <header>Votre sortie à {entry.location.label} le {entry.date}</header>
                <h1>Marée</h1>
                <h1>Météo</h1>
                <h1>Règlementation</h1>
                <h1>Bonne pratiques</h1>
            </div>
        );
    }
}

export default Planning;
