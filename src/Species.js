import React, { Component } from 'react';
var _ = require('lodash');
import tides from './tides-camaret.json'
import TideChart from './TideChart';
import cloudy from './cloudy.png';

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
                        <td>{how}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Species;
