import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class UsersChart extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';
    render() {
        const data = this.props.data;
        data.forEach(element => {
            element.puntuacion = element.score;
        });
        return (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="puntuacion" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}