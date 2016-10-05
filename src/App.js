import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './App.css';

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
                coordinates: suggestion.location,
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
                        <button onClick={this.onSearch.bind(this)}>
                            Rechercher
                        </button>
                    </div>
               );
            case 'searchResult':
                return (
                    <div className='search-result'>
                        <div>{this.state.location.label}</div>
                        <div>{this.state.when.label}</div>
                    </div>
                );
            default:
                return null;
        }
    }
}

export default App;
