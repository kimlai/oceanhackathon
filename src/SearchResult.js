import React, { Component } from 'react';
var _ = require('lodash');
import TideChart from './TideChart';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounds: null,
        };
    }

    componentWillMount() {
        const position = this.props.location.location;
        const locations = groupByLocation(this.props.searchResults);
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map-container';
        mapContainer.style.height = window.innerHeight + 'px';
        document.body.appendChild(mapContainer);
        const map = window.L.map('map-container').setView(position, 13);
        window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/kimlai/city4g5cd00b22iqiwvyfdlv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18 })
        .addTo(map);
        locations.forEach(function (location) {
            const marker = window.L.marker(location.location)
            marker.bindPopup(location.species.join(', ')).openPopup();
            marker.addTo(map);
        });
        map.on('moveend', () => {
            this.setState({ bounds: map.getBounds() });
        });
        map.whenReady(() => {
            this.setState({ bounds: map.getBounds() });
        });
        this.map = map;
    }

    moveToLanildut() {
        this.map.setView([48.473, -4.745], 13);
    }

    renderSpecies(species) {
        let result;
        if (species.length === 0) {
            result = <div>
                Rien à pêcher par ici, essayez à <a onClick={this.moveToLanildut.bind(this)} href="#">Lanildut</a>
            </div>;
        } else {
            result = groupBySpecies(species).map(function (result) {
                return <div key={result.species}>{result.species}</div>;
            });
        }
        return (
            <div className='species'>
                {result}
            </div>
        );
    }

    render() {
        const inBounds = _.filter(this.props.searchResults, (result) => {
            if (!this.state.bounds) {
                return true;
            }
            return this.state.bounds.contains(
                window.L.latLng(result.location)
            );
        });
        return (
            <div className='search-result'>
                <div>{this.props.location.label}</div>
                <div>{this.props.when.label}</div>
                {this.renderSpecies(inBounds)}
                <TideChart />
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
