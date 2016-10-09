import React, { Component } from 'react';
import Slider from 'rc-slider';
import classNames from 'classnames';
var _ = require('lodash');
import 'rc-slider/assets/index.css';
import tides from './tides-camaret.json'
import TideChart from './TideChart';
import Navigation from './Navigation';

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
            coeff: 40,
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
        mapContainer.style.height = (window.innerHeight - 56) + 'px';
        document.body.appendChild(mapContainer);
        const map = window.L.map('map-container', { scrollWheelZoom: false }).setView(position, 13);
        window.L.tileLayer(
            'https://api.mapbox.com/styles/v1/kimlai/city4g5cd00b22iqiwvyfdlv4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2ltbGFpIiwiYSI6ImNpdHg4b3psMDAwMnAzd29hZ2VrbzVmeTcifQ.JEzjYNojtEPRBove3beibA',
            { maxZoom: 18 })
        .addTo(map);
        //modif chojnacki
        window.L.tileLayer.wms('http://geosu-iuem.univ-brest.fr/geoserver/LETG-BREST/wms', {
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
            return div;
        };

        legend.addTo(map);

        //fin modif chojnacki
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

    moveToCamaret(e) {
        e.preventDefault();
        this.setState({
            where: {
                location: {
                    lat: 48.1636,
                    lng: -4.435
                },
                label: 'Camaret-sur-mer'
            }
        });
        this.map.setView([48.286, -4.606], 13);
    }

    planFishingTrip(date) {
        const planning =[{
            date: date,
            location: {
                label: 'Camaret-sur-mer' ,
                location: [48.286, -4.606]
            }
        }];
        return function () {
            window.localStorage.setItem('planning', JSON.stringify(planning));
            this.context.router.push('/planned');
        }
    }

    groupBy(criteria) {
        this.setState({ groupingCriteria: criteria });
    }

    renderSearchResult(searchResult, groupingCriteria) {
        if (searchResult.length === 0) {
            return (
                <div className='search-result'>
                    <div className='empty-search-result'>
                        Pas d'informations sur cette zone, déplacez-vous sur la carte, ou essayez à <a onClick={this.moveToCamaret.bind(this)} href="#">Camaret-sur-mer</a>
                    </div>
                </div>
            );
        }
        let result;
        if (groupingCriteria === 'date') {
            result = this.renderByDate(groupByDate(searchResult, this.state.coeff));
        } else {
            result = this.renderBySpecies(groupBySpecies(searchResult));
        }
        return (
            <div className='search-result'>
                <div className='filters'>
                    {this.renderGroupingCriteria('date', 'date')}
                    {this.renderGroupingCriteria('species', 'espèce')}
                    <div className='coeff-range'>
                        <label>Coeff. > {this.state.coeff}</label>
                        <div className='slider-container'>
                            <Slider
                                value={this.state.coeff}
                                onChange={(value) => { this.setState({ coeff : value })}}
                                step={10}
                                min={40}
                                max={120}
                            />
                        </div>
                    </div>
                </div>
                <div className='search-results'>
                    {result}
                </div>
            </div>
        );
    }

    renderBySpecies(species) {
        return species.map(function (result) {
            return <div key={result.species} className='search-result-item by-species'>
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
            const coeffs = result.tides.map((tide) => {
                return tide.coef;
            });
            const onlyCoeffs = _.filter(coeffs, (coef) => { return typeof coef !== 'undefined' });
            return <div key={result.date} className='search-result-item'>
                <div className='search-result-item-title'>{result.date}</div>
                <div className='search-result-item-body'>
                    <div>
                        <div className='search-result-item-information-header'>Marée ({onlyCoeffs.join(', ')})</div>
                        <TideChart data={result.tides} />
                    </div>
                    <div>
                        <div className='search-result-item-information-header'>Espèces présentes</div>
                        <div className='date-species'>
                            {result.species.join(', ')}
                        </div>
                        <div className='search-result-item-information-header'>❌ Espèces interdites à la pêche</div>
                        <div className='date-species'>
                            {_.union(result.forbidden).join(', ')}
                        </div>
                    </div>
                </div>
                <div className='plan-wrapper'>
                    <button
                        className='plan'
                        onClick={this.planFishingTrip(result.date).bind(this)}
                    >
                    Planifier une sortie
                    </button>
                </div>
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
            <div>
                <Navigation />
                <div className='search-result-container'>
                    <div className='search-result-criteria'>
                        <div>{this.state.where.label}</div>
                        <div>-</div>
                        <div>{this.state.when.label}</div>
                    </div>
                    {this.renderSearchResult(inBounds, this.state.groupingCriteria)}
                </div>
            </div>
        );
    }

    fakeSearchResults() {
        const searchResults =
            [ { species: 'Bigorneaux'
              , forbidden: 'Ormeaux'
              , date: '23 Octobre 2016'
              , location: [48.286, -4.606]
              }
            , { species: 'Bigorneaux'
              , forbidden: 'Ormeaux'
              , date: '17 Octobre 2016'
              , location: [48.286, -4.606]
              }
            , { species: 'Bigorneaux'
              , forbidden: 'Ormeaux'
              , date: '12 Octobre 2016'
              , location: [48.286, -4.606]
              }
            , { species: 'Crevettes bouquet'
              , forbidden: 'Ormeaux'
              , date: '12 Octobre 2016'
              , location: [48.286, -4.606]
              }
            , { species: 'Bigorneaux'
              , forbidden: 'Ormeaux'
              , date: '16 Octobre 2016'
              , location: [48.286, -4.606]
              }
            , { species: 'Crevettes bouquet'
              , forbidden: 'Ormeaux'
              , date: '23 Octobre 2016'
              , location: [48.327342, -4.542846]
              }
            , { species: 'Etrilles'
              , forbidden: 'Ormeaux'
              , date: '15 Octobre 2016'
              , location: [48.327342, -4.542846]
              }
            , { species: 'Moules'
              , forbidden: 'Ormeaux'
              , date: '15 Octobre 2016'
              , location: [48.285489, -4.479987]
              }
            , { species: 'Moules'
              , forbidden: 'Ormeaux'
              , date: '18 Octobre 2016'
              , location: [48.286, -4.606]
              }
            , { species: 'Tourteaux'
              , forbidden: 'Ormeaux'
              , date: '18 Octobre 2016'
              , location: [48.285489, -4.479987]
              }
            , { species: 'Ormeaux'
              , forbidden: 'Ormeaux'
              , date: '18 Octobre 2016'
              , location: [48.286, -4.606]
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

function groupByDate(results, maxCoeff) {
    const grouped = _.reduce(results, function (acc, result) {
        const species = result.species;
        const forbidden = result.forbidden;
        const date = result.date;
        const location = result.location;
        const existingResult = _.find(acc, function (result) {
            return result.date === date;
        });
        if (existingResult) {
            existingResult.species.push(species);
            existingResult.forbidden.push(forbidden);
            existingResult.locations.push(location);
        } else {
            acc.push({
                date: date,
                species: [species],
                forbidden: [forbidden],
                locations: [location],
            });
        }
        return acc;
    }, []);

    const isOnTheSameDay = function (date1, date2) {
        return date1.getDate() === date2.getDate() 
            && date1.getMonth() === date2.getMonth()
            && date1.getFullYear() === date2.getFullYear()
    };

    grouped.map((result) => {
        const tidesOfDay  =_.filter(tides, (tide) => {
            return isOnTheSameDay(new Date(tide.dateTime), new Date(result.date));
        });
        result.tides = tidesOfDay;
        return result;
    });

    const onlyMatchingCoeff = _.filter(grouped, (result) => {
        return _.some(result.tides, (tide) => {
            return tide.coef >= maxCoeff;
        });
    });

    return _.sortBy(onlyMatchingCoeff, ['date']);
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
