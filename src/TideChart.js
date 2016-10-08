import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

class TideChart extends Component {
    render() {
        const data = this.props.data.map((tideData) => {
            const date = new Date(tideData.dateTime);
            return {
                time: date.getHours() + 'h' + date.getMinutes(),
                height: parseFloat(tideData.height),
            };
        });
        return (
            <div className='tide-chart'>
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
