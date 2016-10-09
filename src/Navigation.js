import React, { Component } from 'react';
import { Link } from 'react-router';

import patrick from './images/patrick.png';

class Navigation extends Component {
    render() {
        return (
            <nav>
                <div className='nav-one'>
                    <img src={patrick} width={48} height={48} className='logo' alt='comer'/>
                    <Link to='/' className='search'>Recherche</Link>
                </div>
                <div className='nav-two'>
                    <Link to='/planned' className='planned'>Sorties à venir</Link>
                    <Link to='/feedback' className='fishing-book'>Carnet de pêche</Link>
                    <div className='account'>Kim Laï T.</div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
