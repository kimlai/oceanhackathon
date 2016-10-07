import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
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

    render() {
        return (
            <Router history={browserHistory}>
                <Route
                    path='/'
                    component={Search}
                />
                <Route
                    path='/search/:whereLat/:whereLng/:whereLabel/:whenLabel/:whenValue'
                    component={SearchResult}
                />
            </Router>
        );
    }
}

export default App;
