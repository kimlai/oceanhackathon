import React, { Component } from 'react';

import data from './test.json'

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
        const mapElement = document.getElementById('planning-entry-map-container');
        mapElement.remove();
    }


    componentWillMount() {
        const position = this.state.entry.location.location;
        const mapContainer = document.createElement('div');
        mapContainer.id = 'planning-entry-map-container';
        document.body.appendChild(mapContainer);
        const map = window.L.map('planning-entry-map-container', { scrollWheelZoom: true }).setView(position, 15);
        window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/kimlai/city4g5cd00b22iqiwvyfdlv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18 })
        .addTo(map);
        var polygon = window.L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
        ]).addTo(map);

        function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup(feature.properties.OBJECTID);
        }
        }
       // $.getJSON("test.geojson",function(data){
        // add GeoJSON layer to the map once the file is loaded
        // polygon = window.L.geoJson(data).addTo(map);
        window.L.geoJSON(data, {
            onEachFeature: onEachFeature
        }).addTo(map);
        //});
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
