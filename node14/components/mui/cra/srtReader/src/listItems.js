import * as React from 'react';

import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ResponsiveContainer } from 'recharts';
import kuromoji from 'kuromoji'

// console.log(` in the build? ${process.env.PUBLIC_URL}`);

var tokenizer = null;
kuromoji.builder({ dicPath: '/dict' }).build(function (err, tker) {
  tokenizer = tker;
});

const { default: srtParser2 } = require("srt-parser-2")
const parser = new srtParser2()

export function MainListItem(prop) {
  const [stateItems, setItemValues] = React.useState([]);
  function getColor(x) {
    for (var i=0; i<prop.vocab.length; ++i) {
      if (prop.vocab[i].arr.includes(x)) {
        // tmpMatchedVocab[i].count += 1;
        return prop.vocab[i].color;
      }
    }

    // tmpMatchedVocab[tmpMatchedVocab.length-1].count += 1;
    return "#ffffff00";
  }

  function doStyling(x) {
    const mystyle = {
      backgroundColor: getColor(x)
    };

    return (<span style={mystyle}> {x} </span>)
  }

  function doTokenization (x) {
    return tokenizer.tokenize(x.text).map(x => doStyling(x.surface_form))
  }

  function doMatching(tmpMatchedVocab, x) {
    for (var i=0; i<prop.vocab.length; ++i) {
      if (prop.vocab[i].arr.includes(x)) {
        tmpMatchedVocab[i].count += 1;
        return;
      }
    }
  
    tmpMatchedVocab[tmpMatchedVocab.length-1].count += 1;
  }

  function initMatchedArr(result) {
    let tmpMatchedVocab = prop.vocab.map((x, idx) => {
      return {
        "name": prop.vocab[idx].name,
        "count": 0,
        "color": prop.vocab[idx].color
      }
    });
    
    tmpMatchedVocab.push({
      "name": "others",
      "count": 0,
      "color": "black"
    })

    result.map(x => {
      tokenizer.tokenize(x.text).map(x => doMatching(tmpMatchedVocab, x.surface_form))
    });

    prop.handleMatched(tmpMatchedVocab);
  }

  const renderItems = (items) => (
    <div>
      { 
        Array.isArray(items)
          ? items.map(x => {
            
            return (
              <ListItemButton key={x.id} onClick={() => prop.handleJump(x.startTime)}>
                <ListItemText 
                  primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                  primary={ doTokenization(x) }
                  secondary={ x.startTime + " -> " + x.endTime } 
                />
              </ListItemButton>
            );
          }) : null
      }
    </div>
  );
  
  async function ReadFile(file) {
    return await file.text()
  }
  
  function handleSrtData(data) {
    var result = parser.fromSrt(data);
    console.log(result);
  
    initMatchedArr(result);

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
