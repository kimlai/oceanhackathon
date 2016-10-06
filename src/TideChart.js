import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class TideChart extends Component {
    render() {
        const data = [
            { time: '2h', height: 4.2 },
            { time: '3h', height: 1.2 },
            { time: '8h', height: 6.6 },
            { time: '14h', height: 2.1 },
            { time: '20h', height: 6.4 },
            { time: '24h', height: 4.3 },
        ];
        return (
            <div className='tide-chart'>
                <h4>Marée</h4>
                <LineChart
                    width={200}
                    height={200}
                    data={data}
                    margin={{ top: 12, right: 12, bottom: 12, left: 0 }}
                >
                    <Line type="monotone" dataKey="height" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                </LineChart>
            </div>
        );
    }
}

export default TideChart;
