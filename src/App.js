import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import 'react-select/dist/react-select.css';
import './App.css';
import Search from './Search';
import SearchResult from './SearchResult';
import Planning from './Planning';
import PlanningEntry from './PlanningEntry';
import Feedback from './Feedback';

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
            <Router>
                <Route
                    path='/'
                    component={Search}
                />
                <Route
                    path='/search/:whereLat/:whereLng/:whereLabel/:whenLabel/:whenValue'
                    component={SearchResult}
                />
                <Route
                    path='/planned'
                    component={Planning}
                />
                <Route
                    path='/planning/:date/:location'
                    component={PlanningEntry}
                />
                <Route
                    path='/feedback'
                    component={Feedback}
                />
            </Router>
        );
    }
}

export default App;
