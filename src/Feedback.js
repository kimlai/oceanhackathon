import React, { Component } from 'react';
import Navigation from './Navigation';

class Feedback extends Component {
    render() {
        return (
            <div>
                <Navigation  />
                <div className='planning-container'>
                    <header>Vos sorties passées</header>
                    <div className='planning-entry'>
                        <div className='date'>30 Septembre 2016</div>
                        <div>Lanildut</div>
                        <button>
                            <a href='/carnet-de-peche.html' className='see-planning-entry'>Voir</a>
                        </button>
                    </div>
                    <div className='planning-entry'>
                        <div className='date'>14 Septembre 2016</div>
                        <div>Lanildut</div>
                        <button>
                            <a href='/carnet-de-peche.html' className='see-planning-entry'>Voir</a>
                        </button>
                    </div>
                    <div className='planning-entry'>
                        <div className='date'>10 Septembre 2016</div>
                        <div>Camaret</div>
                        <button>
                            <a href='/carnet-de-peche.html' className='see-planning-entry'>Voir</a>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feedback;
