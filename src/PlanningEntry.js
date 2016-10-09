import React, { Component } from 'react';
import PlanningEntryInfo from './PlanningEntryInfo';
import Navigation from './Navigation';

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
        mapContainer.style.height = (window.innerHeight - 56) + 'px';
        document.body.appendChild(mapContainer);
        const map = window.L.map('planning-entry-map-container', { scrollWheelZoom: true }).setView(position, 13);
        var mapbox = window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/kimlai/city4g5cd00b22iqiwvyfdlv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18 })
        .addTo(map);

        var wmsLayer = window.L.tileLayer.wms('http://www.ifremer.fr/services/wms1', {
                layers: 'Aires marines protégées',
                format: 'image/png',
                transparent: true,
                opacity: 0.2,
        }).addTo(map);

        var satBretagne = window.L.tileLayer.wms('http://geobretagne.fr/geoserver/photo/wms', {
                layers: 'ortho-composite',
                // format: 'image/png',
                // transparent: true,
                // opacity: 0.2,
        });

        var especes = window.L.tileLayer.wms('http://geosu-iuem.univ-brest.fr/geoserver/LETG-BREST/wms', {
                layers: 'comer_especes',
                format: 'image/png',
                transparent: true,
                // opacity: 0.2,
        }).addTo(map);

        //légende associée

        var legend = window.L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = window.L.DomUtil.create('div', 'info legend');
            div.innerHTML = "<img src = 'http://geosu-iuem.univ-brest.fr/geoserver/LETG-BREST/wms?service=wms&request=GetLegendGraphic&VERSION=1.1.1&FORMAT=image/png&WIDTH=15&HEIGHT=15&layer=comer_especes'>";
            div.innerHTML = "<img src = './legende.png'>";
            return div;
        };

        legend.addTo(map);

        

        var baseMaps = {
            "Plan" : mapbox,
            "Satellite" : satBretagne
        };

        var overlayMaps = {
            "Aires marines protégées" : wmsLayer,
            "Espèces" : especes
        };

        this.map = map;
        wmsLayer.remove();
        window.L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    }

    render() {
        const entry = this.state.entry;
        return (
            <div>
                <Navigation />
                <div className='single-planning-entry-container'>
                    <header>Votre sortie à {entry.location.label} le {entry.date}</header>
                    <PlanningEntryInfo entry={entry} />
                </div>
            </div>
        );
    }
}

export default Planning;
