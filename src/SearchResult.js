import React, { Component } from 'react';
var _ = require('lodash');

class SearchResult extends Component {
    componentWillMount() {
        const position = this.props.location.location;
        const locations = groupByLocation(this.props.searchResults);
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map-container';
        mapContainer.style.height = window.innerHeight + 'px';
        document.body.appendChild(mapContainer);
        const mymap = window.L.map('map-container').setView(position, 13);
        window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18, detectRetina: true })
        .addTo(mymap);
        locations.forEach(function (location) {
            const marker = window.L.marker(location.location)
            marker.bindPopup(location.species.join(', ')).openPopup();
            marker.addTo(mymap);
        });
    }
    render() {
        return (
            <div className='search-result'>
                <div>{this.props.location.label}</div>
                <div>{this.props.when.label}</div>
                <div className='species'>
                    {groupBySpecies(this.props.searchResults).map(function (result) {
                        return <div key={result.species}>{result.species}</div>;
                    })}
                </div>
            </div>
        );
    }
}

function groupBySpecies(results) {
    return _.reduce(results, function (acc, result) {
        const species = result.species;
        const date = result.date;
        const location = result.location;
        const existingResult = _.find(acc, function (result) {
            return result.species === species;
        });
        if (existingResult) {
            existingResult.dates.push(date);
            existingResult.locations.push(location);
        } else {
            acc.push({
                species: species,
                dates: [date],
                locations: [location],
            });
        }
        return acc;
    }, []);
}

function groupByLocation(results) {
    return _.reduce(results, function (acc, result) {
        const species = result.species;
        const date = result.date;
        const location = result.location;
        const existingResult = _.find(acc, function (result) {
            return result.location.join('') === location.join('');
        });
        if (existingResult) {
            existingResult.dates.push(date);
            existingResult.species.push(species);
        } else {
            acc.push({
                species: [species],
                dates: [date],
                location: location,
            });
        }
        return acc;
    }, []);
}

export default SearchResult;
