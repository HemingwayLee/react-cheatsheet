import * as React from 'react';
import Button from '@mui/material/Button';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import intl from 'react-intl-universal';

export default function VocabChart(prop) {
  async function ReadFile(file) {
    return await file.text()
  }
  
  function handleTxtData(filename, data) {
    prop.handleVocabFileLoad(filename, data);
  }
  
  function handleClick({target}) {
    if (target.files.length < 1) {
      return
    }

    const selectedFile = target.files[0];
    
    const promise = new Promise(resolve => {
      const fileContent = ReadFile(selectedFile);
      resolve(fileContent);
    });
  
    promise.then(fileContent => {
      const filename = selectedFile.name;
      handleTxtData(filename, fileContent);
    });
  }

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleClick}>
        {intl.get("load_txt_file")}
        <input type="file" accept=".txt" hidden />
      </Button>
      {/* <h1>Total Vocabulary</h1>
      <h2>
        { prop.data.reduce((sum, x) => sum + x.count, 0) }
      </h2> */}
      <ResponsiveContainer>
        <PieChart>
          <Legend verticalAlign="top" height={36}/>
          <Tooltip />
          <Pie data={prop.data} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
            {
              prop.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
