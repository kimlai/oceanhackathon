import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import './App.css';

class App extends Component {
    onLocationSelected(suggestion) {
        console.log(suggestion);
        this.setState({
            location: suggestion.location
        });
    }

    render() {
        return (
            <div className='search-form'>
                <Geosuggest
                    placeholder='Où ?'
                    country='fr'
                    onSuggestSelect={this.onLocationSelected.bind(this)}
                />
                <input placeholder='Quand ?'/>
                <button>Rechercher</button>
            </div>
       );
    }
}

export default App;
