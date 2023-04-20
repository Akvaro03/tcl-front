import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export default class CircleStatistics extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';

  render() {
    let CountTypes = []
    let example = [
      { name: 'Terminadas', value: 40 },
      { name: 'Pendientes', value: 20 },
    ]
    const data = this.props.data;
    if (data) {
      data.forEach(ot => {
        let found = CountTypes.findIndex(element => element.name === ot.StateProcess)
        if (found >= 0) {
          CountTypes[found].value += 1;
        } else {
          CountTypes.push({ name: ot.StateProcess, value: 1 })
        }
      });
      console.log(CountTypes)
    }
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={CountTypes}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
