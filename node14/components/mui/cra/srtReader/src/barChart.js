import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, LabelList, Label, ResponsiveContainer } from 'recharts';
import intl from 'react-intl-universal';
  
export default function MatchedChart(prop) {
  return (
    <React.Fragment>
      <h2>{intl.get("matched_vocabulary")}</h2>
      <ResponsiveContainer>
        <BarChart 
          data={prop.data}
          layout="vertical" 
          barCategoryGap={1}
          margin={{right: 45}}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name"/>  
          <Tooltip/>
          <Bar 
            dataKey="count" 
            // fill={theme.palette.text.primary}
            // adding label will be very slow, no idea why
            // label={<Label />}
          >   
            <LabelList dataKey="percentage" position="right"></LabelList>
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
