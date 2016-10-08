import React, { Component } from 'react';

class Planning extends Component {
    constructor(props) {
        super(props);
        const planning = JSON.parse(window.localStorage.getItem('planning')) || [];
        const entry = planning[0] || null;
        this.state = {
            entry: entry
        };
    }

    render() {
        const entry = this.state.entry;
        return (
            <div className='single-planning-entry-container'>
                <header>Ma sortie à {entry.location.label} le {entry.date}</header>
                <h1>Marée</h1>
                <h1>Météo</h1>
                <h1>Règlementation</h1>
                <h1>Bonne pratiques</h1>
            </div>
        );
    }
}

export default Planning;
