import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import { ResponsiveContainer } from 'recharts';

export default function CardChart(prop) {
  const theme = useTheme();

  async function ReadFile(file) {
    return await file.text()
  }
  
  function handleTxtData(filename, data) {
    prop.handleVocabFileLoad(filename, data);
  }
  
  function handleClick({target}) {
    const selectedFile = target.files[0];
    // console.log(selectedFile);
  
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
        Load Vocabulary
        <input type="file" accept=".txt" hidden />
      </Button>
      <h1>Total Vocabulary</h1>
      <h2>
        { prop.data.reduce((sum, x) => sum + x.count, 0) }
      </h2>
    </React.Fragment>
  );
}
