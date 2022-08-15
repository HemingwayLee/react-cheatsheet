import * as React from 'react';

import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ResponsiveContainer } from 'recharts';

const { default: srtParser2 } = require("srt-parser-2")
const parser = new srtParser2()

export function MainListItem() {
  const [stateItems, setItemValues] = React.useState([]);
  
  const renderItems = (items) => (
    <div>
      { Array.isArray(items)
        ? items.map(x => {
          return (
            <ListItemButton key={x.id}>
              <ListItemText 
                primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                primary={x.text} 
                secondary={ x.startTime + " -> " + x.endTime } 
              />
            </ListItemButton>
          );
        })
        : null}
    </div>
  );
  
  async function ReadFile(file) {
    return await file.text()
  }
  
  function handleSrtData(data) {
    var result = parser.fromSrt(data);
    console.log(result);
  
    setItemValues(result);
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
      console.log(filename);
  
      handleSrtData(fileContent);
    });
  }

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleClick}>
        Load Srt File
        <input type="file" accept=".srt" hidden />
      </Button>
      <ResponsiveContainer width="95%" height={400}>
        { renderItems(stateItems) }
      </ResponsiveContainer>
    </React.Fragment>
  );
}
