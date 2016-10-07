import React, { Component } from 'react';
import classNames from 'classnames';
var _ = require('lodash');
import TideChart from './TideChart';

class SearchResult extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            bounds: null,
            groupingCriteria: 'date',
            where: {
                location: {
                    lat: props.params.whereLat,
                    lng: props.params.whereLng,
                },
                label: props.params.whereLabel
            },
            when: {
                value: props.params.whenValue,
                label: props.params.whenLabel,
            },
            searchResults: this.fakeSearchResults(),
        };
    }

    componentWillUnmount() {
        this.map.remove();
        const mapElement = document.getElementById('map-container');
        mapElement.remove();
    }

    componentWillMount() {
        const position = this.state.where.location;
        const locations = groupByLocation(this.state.searchResults);
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

    planFishingTrip() {
        this.context.router.push('/planned');
    }

    groupBy(criteria) {
        this.setState({ groupingCriteria: criteria });
    }

    renderSearchResult(searchResult, groupingCriteria) {
        let result;
        if (searchResult.length === 0) {
            result = <div>
                Rien à pêcher par ici, essayez à <a onClick={this.moveToLanildut.bind(this)} href="#">Lanildut</a>
            </div>;
        } else {
            if (groupingCriteria === 'date') {
                result = this.renderByDate(groupByDate(searchResult));
            } else {
                result = this.renderBySpecies(groupBySpecies(searchResult));
            }
        }
        return (
            <div className='search-result'>
                {result}
            </div>
        );
    }

    renderBySpecies(species) {
        return species.map(function (result) {
            return <div key={result.species} className='search-result-item'>
                <div className='search-result-item-title'>{result.species}</div>
                <div className='species-dates'>
                    {result.dates.map(function (date) {
                        return <div key={date}>{date}</div>;
                    })}
                </div>
            </div>;
        });
    }

    renderByDate(dates) {
        return dates.map((result) => {
            return <div key={result.date} className='search-result-item'>
                <div className='search-result-item-title'>{result.date}</div>
                <div className='date-species'>
                    {result.species.join(', ')}
                </div>
                <TideChart />
                <button
                    className='plan'
                    onClick={this.planFishingTrip.bind(this)}
                >
                    Planifier une sortie
                </button>
            </div>;
        });
    }

    renderGroupingCriteria(criteria, label) {
        return (
            <div className={classNames(
                'grouping-criteria', { 'grouping-criteria--active': this.state.groupingCriteria === criteria }
                )}
                onClick={() => this.groupBy(criteria)}
            >Par {label}</div>
        );
    }

    render() {
        const inBounds = _.filter(this.state.searchResults, (result) => {
            if (!this.state.bounds) {
                return true;
            }
            return this.state.bounds.contains(
                window.L.latLng(result.location)
            );
        });
        return (
            <div className='search-result-container'>
                <div>
                    <div>{this.state.where.label}</div>
                    <div>{this.state.when.label}</div>
                </div>
                <div>
                    {this.renderGroupingCriteria('date', 'date')}
                    {this.renderGroupingCriteria('species', 'espèce')}
                </div>
                {this.renderSearchResult(inBounds, this.state.groupingCriteria)}
            </div>
        );
    }

    fakeSearchResults() {
        const searchResults =
            [ { species: 'palourde'
              , date: '23 Octobre'
              , location: [48.473, -4.741]
              }
            , { species: 'palourde'
              , date: '15 Octobre'
              , location: [48.477, -4.749]
              }
            , { species: 'crevette grise'
              , date: '23 Octobre'
              , location: [48.472, -4.742]
              }
            , { species: 'telline'
              , date: '15 Octobre'
              , location: [48.471, -4.745]
              }
            , { species: 'moule'
              , date: '15 Octobre'
              , location: [48.471, -4.745]
              }
            ];

        return searchResults;
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

function groupByDate(results) {
    return _.reduce(results, function (acc, result) {
        const species = result.species;
        const date = result.date;
        const location = result.location;
        const existingResult = _.find(acc, function (result) {
            return result.date === date;
        });
        if (existingResult) {
            existingResult.species.push(species);
            existingResult.locations.push(location);
        } else {
            acc.push({
                date: date,
                species: [species],
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
