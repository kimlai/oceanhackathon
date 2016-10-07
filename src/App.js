import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import './App.css';
import Search from './Search';
import SearchResult from './SearchResult';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            where: null,
            when: null,
            page: 'search',
        };
    }

    onLocationSelected(suggestion) {
        this.setState({
            where: {
                location: suggestion.location,
                label: suggestion.label
            }
        });
    }

    onWhenSelected(value) {
        this.setState({ when: value });
    }

    onSearch(where, when) {
        this.setState({ page: 'searchResult' });
    }

    render() {
        switch (this.state.page) {
            case 'search':
                return <Search
                    where={this.state.where}
                    when={this.state.when}
                    onSearch={this.onSearch.bind(this)}
                    onLocationSelected={this.onLocationSelected.bind(this)}
                    onWhenSelected={this.onWhenSelected.bind(this)}
                />;
            case 'searchResult':
                return <SearchResult
                    where={this.state.where}
                    when={this.state.when}
                    searchResults={this.fakeSearchResults()}
                />;
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
