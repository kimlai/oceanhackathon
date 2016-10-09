import React, { Component } from 'react';
var _ = require('lodash');
import tides from './tides-camaret.json'
import TideChart from './TideChart';
import Species from './Species';
import cloudy from './cloudy.png';
import ormeaux from './images/Ormeau.png';
import tourteaux from './images/Tourteau.png';
import moule from './images/Moule.png';
import crevette from './images/Crevette.png';
import etrille from './images/Etrille.png';
import bigorneau from './images/Bigorneau.png';

class Planning extends Component {
    render() {
        const entry = this.props.entry;
        const isOnTheSameDay = function (date1, date2) {
            return date1.getDate() === date2.getDate() 
                && date1.getMonth() === date2.getMonth()
                && date1.getFullYear() === date2.getFullYear()
        };
        const tidesOfDay  =_.filter(tides, (tide) => {
            return isOnTheSameDay(new Date(tide.dateTime), new Date(entry.date));
        });
        const coeffs = tidesOfDay.map((tide) => {
            return tide.coef;
        });
        const onlyCoeffs = _.filter(coeffs, (coef) => { return typeof coef !== 'undefined' });
        return (
            <div>
                <div className='single-planning-entry-fst-row'>
                    <div className='single-planning-entry-tide'>
                        <h1>Marée ({onlyCoeffs.join(', ')})</h1>
                        <TideChart
                            width={400}
                            data={tidesOfDay}
                            margin={{ top: 12, right: 36, bottom: 12, left: 0 }}
                        />
                    </div>
                    <div className='single-planning-entry-wheather'>
                        <h1>Météo</h1>
                        <img width={180} height={180} src={cloudy} alt='cloudy' />
                        <div className='wheather-info'>
                            <div>Nuageux</div>
                            <div className='temperature'>17°</div>
                        </div>
                    </div>
                </div>
                <div className='single-planning-entry-snd-row'>
                    <div className='single-planning-entry-species'>
                        <h1>Les espèces que vous allez rencontrer</h1>
                        <div className='species-container'>
                            {getSpecies().map((species) => {
                                return <Species species={species} />
                            })}
                        </div>
                    </div>
                    <h1>Bonne pratiques</h1>
                        <div className='species-container'>
                        <div> Site référent pour la peche a pied: <a href='http://www.pecheapied-responsable.fr/'> pêche à pied responsable</a> </div>



                        </div>
                </div>
            </div>
        );
    }
}
                        // <div> une vidéo <video><source='http://www.pecheapied-responsable.fr/' type="video/mp4"></video></div>
function getSpecies() {
    return [
        { name: 'Tourteau'
        , latin: 'Cancer pagurus'
        , when: 'Toute l\'année'
        , size: '14cm'
        , quantity: '10 /jour/pêcheur'
        , how: 'Crochet, à la main'
        , image: tourteaux
        },
        { name: 'Crevette bouquet'
        , latin: 'Palaemon serratus'
        , when: 'Toute l’année'
        , size: '5cm'
        , quantity: '5L /jour/pêcheur'
        , how: 'Petite épuisette, haveneau'
        , image: crevette
        },
        { name: 'Etrille'
        , latin: 'Necora puber'
        , when: 'Toute l’année'
        , size: '6,5cm'
        , quantity: '40 /jour/pêcheur'
        , how: 'Crochet, à la main'
        , image: etrille
        },
        { name: 'Bigorneau'
        , latin: 'Littorina littorea'
        , when: 'Toute l’année'
        , size: 'Prendre les plus gros individus'
        , quantity: '500 /jour (env. 3 kg) et /pêcheur'
        , how: 'À la main'
        , image: bigorneau
        },
        { name: 'Ormeaux'
        , latin: 'Haliotis tuberculata'
        , when: 'Interdit du 15/06 au 31/08'
        , size: '9cm'
        , quantity: '20 /jour/pêcheur'
        , how: 'Crochet, à la main'
        , image: ormeaux
        },
        { name: 'Moules'
        , latin: 'Mytilus edulis'
        , when: 'Interdit du 01/05 au 31/08'
        , size: '4cm'
        , quantity: '300 /jour (env. 3 kg) /pêcheur'
        , how: 'Griffe à dents, couteau'
        , image: moule
        }
    ];
}

function getPratiques() {
    return [
        { nom: 'peche à pied'
        }
    ];
}

export default Planning;
