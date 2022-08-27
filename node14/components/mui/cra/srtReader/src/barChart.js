import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, Label, ResponsiveContainer } from 'recharts';
import intl from 'react-intl-universal';
  
export default function MatchedChart(prop) {
  return (
    <React.Fragment>
      <h2>{intl.get("matched_vocabulary")}</h2>
      <ResponsiveContainer>
        <BarChart data={prop.data}
          layout="vertical" barCategoryGap={1}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name"/>  
          <Tooltip/>
          <Bar 
            dataKey="count" 
            // fill={theme.palette.text.primary}
            // adding label will be very slow, no idea why
            // label={<Label />}
          >   
            {
              prop.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
