import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';
import SearchResult from './SearchResult';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            when: null,
            page: 'search',
        };
    }

    onLocationSelected(suggestion) {
        this.setState({
            location: {
                location: suggestion.location,
                label: suggestion.label
            }
        });
    }

    onWhenSelected(value) {
        this.setState({ when: value });
    }

    onSearch() {
        this.setState({ page: 'searchResult' });
    }

    render() {
        const whenOptions = [
            { value: 'thisWeek', label: 'Cette semaine' },
            { value: 'thisMonth', label: 'Ce mois-ci' },
            { value: 'nextSixMonth', label: 'Dans les 6 prochains mois' },
        ];
        switch (this.state.page) {
            case 'search':
                return (
                    <div className='search-form'>
                        <Geosuggest
                            placeholder='Où ?'
                            country='fr'
                            onSuggestSelect={this.onLocationSelected.bind(this)}
                        />
                        <div className='search-when'>
                            <Select
                                placeholder='Quand ?'
                                name='search-when'
                                options={whenOptions}
                                value={this.state.when}
                                searchable={false}
                                clearable={false}
                                onChange={this.onWhenSelected.bind(this)}
                            />
                        </div>
                        <button
                            onClick={this.onSearch.bind(this)}
                            disabled={!(this.state.when && this.state.location)}
                        >
                            Rechercher
                        </button>
                    </div>
               );
            case 'searchResult':
                return <SearchResult
                    location={this.state.location}
                    when={this.state.when}
                    searchResults={this.fakeSearchResults()}
                />
            default:
                return null;
        }
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

export default App;
