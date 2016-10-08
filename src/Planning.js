import React, { Component } from 'react';
import { Link } from 'react-router'

class Planning extends Component {
    constructor(props) {
        super(props);
        const planning = JSON.parse(window.localStorage.getItem('planning')) || [];
        this.state = {
            planning: planning
        };
    }

    renderPlanning(planning) {
        if (planning.length === 0) {
            return (
                <div>
                    <div>Aucune sortie planifiée pour l'instant </div><Link to="/">Faire une recherche</Link>
                </div>
            );
        }
        return planning.map((entry) => {
            const link = '/planning/' + entry.date + '/' + entry.location.label;
            return <div key={entry.date} className='planning-entry'>
                <div className='date'>{entry.date}</div>
                <div>{entry.location.label}</div>
                <button>
                    <Link className='see-planning-entry' to={link}>Voir</Link>
                </button>
            </div>;
        });
    }

    render() {
        return (
            <div className='planning-container'>
                <header>Vos sorties prévues</header>
                {this.renderPlanning(this.state.planning)}
            </div>
        );
    }
}

export default Planning;
