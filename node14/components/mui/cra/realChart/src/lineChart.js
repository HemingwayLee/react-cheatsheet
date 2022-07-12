import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, Legend, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

// NOTE: tooltip is not working something

function createData(time, a1, a2) {
  return { "time": time, "a1": a1, "a2": a2 };
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const data = [
  createData('00:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('03:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('06:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('09:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('12:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('15:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('18:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('21:00', getRandomArbitrary(0, 2500), getRandomArbitrary(0, 2500)),
  createData('24:00', undefined, getRandomArbitrary(0, 2500)),
];

export default function MyLineChart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <h1>Today</h1>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <XAxis dataKey="time" style={theme.typography.body2}/>
          <YAxis style={theme.typography.body2}>
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="a1" stroke="#00FF00" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="a2" stroke="#FF0000" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
