import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';
  
export default function VocabularyChart(prop) {
  const theme = useTheme();

  return (
    <React.Fragment>
      <h1>Vocabulary</h1>
      <ResponsiveContainer>
        <BarChart data={prop.data}
          layout="vertical" barCategoryGap={1}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name"/>  
          <Bar 
            dataKey="count" 
            fill={theme.palette.text.primary}
            label={<Label />}
          />   
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
