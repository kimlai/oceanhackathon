import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import Select from 'react-select';

class Search extends Component {
    render() {
        const whenOptions = [
            { value: 'thisWeek', label: 'Cette semaine' },
            { value: 'thisMonth', label: 'Ce mois-ci' },
            { value: 'nextSixMonth', label: 'Dans les 6 prochains mois' },
        ];
        return (
            <div className='search-form'>
                <Geosuggest
                    placeholder='Où ?'
                    country='fr'
                    onSuggestSelect={this.props.onLocationSelected}
                />
                <div className='search-when'>
                    <Select
                        placeholder='Quand ?'
                        name='search-when'
                        options={whenOptions}
                        value={this.props.when}
                        searchable={false}
                        clearable={false}
                        onChange={this.props.onWhenSelected}
                    />
                </div>
                <button
                    onClick={this.props.onSearch}
                    disabled={!(this.props.when && this.props.where)}
                >
                    Rechercher
                </button>
            </div>
       );
    }
}

export default Search;
