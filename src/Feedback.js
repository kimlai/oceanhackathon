import React, { Component } from 'react';
import Navigation from './Navigation';

class Feedback extends Component {
    render() {
        return (
            <div>
                <Navigation />
        	<div>
                    <h1>Carnet de pêche</h1>
                    <div> Ma dernière sortie </div>
                    <li> Aucune information sur la dernière sortie. </li><br/>
                    <button id = "renseigner"> renseigner </button>
                 </div>
                 <br/><br/>
                 <div>
                    <h1>Mes anciennes sorties</h1>
                    <div> Sortie du: ... au ... </div>
                    <li> Observations: ... </li>
                    <li> Butin / carnet de pêche: ... </li><br/>
                    <button id = "see_more"> Voir + </button>
                </div>
                <br/>
                    <button id = "home"> Planifier une nouvelle sortie </button>
                 <br/><br/>
                 <br/><br/>
                <div>
                    <h1> + D'infos sur mes zones de pêche </h1>
                    <button>Gestion</button>
                    <span class="spacer"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button> Enjeux patrimoine nat.</button>
                    <br/><br/>
                    <button> Enjeux patrimoine culturel</button>
                    <span class="spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button>La pêche au siècle dernier</button>
                </div>
                <br/>
            </div>
        );
    }
}

export default Feedback;
