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
            </div>
        );
    }
}

export default Planning;
