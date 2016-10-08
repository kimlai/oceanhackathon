import React, { Component } from 'react';

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
        const map = window.L.map('planning-entry-map-container', { scrollWheelZoom: false }).setView(position, 15);
        window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/kimlai/city4g5cd00b22iqiwvyfdlv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18 })
        .addTo(map);
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
