import React, { Component } from 'react';
var _ = require('lodash');
import tides from './tides-camaret.json'
import TideChart from './TideChart';
import cloudy from './cloudy.png';

import epuisette from './images/epuisette.png';
import main from './images/main.png';
import griffe from './images/griffe.png';
import haveneau from './images/haveneau.png';
import crochet from './images/crochet.png';

class Species extends Component {
    render() {
        const {
            name,
            latin,
            when,
            size,
            quantity,
            how,
            image
        } = this.props.species;
        const images = how.map((howItem) => {
            switch(howItem) {
                case 'Petite épuisette':
                    return <img className='howimg' src={epuisette} width={48} height={48} />;
                case 'Griffe à dents':
                    return <img className='howimg' src={griffe} width={48} height={48} />;
                case 'à la main':
                    return <img className='howimg' src={main} width={48} height={48} />;
                case 'haveneau':
                    return <img className='howimg' src={haveneau} width={48} height={48} />;
                case 'Crochet':
                    return <img className='howimg' src={crochet} width={48} height={48} />;
                default:
                    return null;
            }
        });
        return (
            <div className='species'>
                <img width='240' height='240' src={image} />
                <table className='species-info'>
                    <tr>
                        <th className='species-name'>{name}</th>
                        <td><i>{latin}</i></td>
                    </tr>
                    <tr>
                        <th className='label'>Quand les ramasser ?</th>
                        <td>{when}</td>
                    </tr>
                    <tr>
                        <th className='label'>Taille règlementaire</th>
                        <td>{size}</td>
                    </tr>
                    <tr>
                        <th className='label'>Quantité autorisée</th>
                        <td>{quantity}</td>
                    </tr>
                    <tr>
                        <th className='label'>Comment les pêcher ?</th>
                        <td>{images}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Species;
