import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import Select from 'react-select';
import Navigation from './Navigation';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            where: null,
            when: null,
        };
    }

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        const body = document.getElementsByTagName('body')[0];
        body.className = 'poulpe';
    }

    componentWillUnmount() {
        const body = document.getElementsByTagName('body')[0];
        body.className = '';
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

    onSubmit() {
        const {
            where,
            when
        } = this.state;
        this.context.router.push('/search/' + where.location.lat + '/' + where.location.lng + '/' + where.label + '/ ' + when.label + '/' + when.value);
    }

    render() {
        const whenOptions = [
            { value: 'thisWeek', label: 'Cette semaine' },
            { value: 'thisMonth', label: 'Ce mois-ci' },
            { value: 'nextSixMonth', label: 'Dans les 6 prochains mois' },
        ];
        const whatOptions = [
            { value: 'fishing', label: 'Pêche à pied' },
            { value: 'fake', label: 'Randonnée' },
            { value: 'fake', label: 'Sports nautiques' },
            { value: 'fake', label: 'Naturisme' },
            { value: 'fake', label: 'Pokemon Go' },
        ];
        return (
            <div>
                <Navigation />
                <div className='search-from-container'>
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
                        <div className='search-what'>
                            <Select
                                name='search-when'
                                options={whatOptions}
                                value='fishing'
                                searchable={false}
                                clearable={false}
                            />
                        </div>
                        <button
                            onClick={this.onSubmit.bind(this)}
                            disabled={!(this.state.when && this.state.where)}
                        >
                            Rechercher
                        </button>
                    </div>
                </div>
            </div>
       );
    }
}

export default Search;
