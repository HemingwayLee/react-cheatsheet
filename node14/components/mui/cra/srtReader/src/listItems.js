import * as React from 'react';

import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from "@mui/material/IconButton";
import ListItemText from '@mui/material/ListItemText';
import SmileIcon from "@mui/icons-material/Mood";
import Coffee from '@mui/icons-material/Coffee';
import SettingsIcon from "@mui/icons-material/Settings"
import { ResponsiveContainer } from 'recharts';
import kuromoji from 'kuromoji';
import SimpleDialog from './profile';

// console.log(` in the build? ${process.env.PUBLIC_URL}`);

var tokenizer = null;
kuromoji.builder({ dicPath: '/dict' }).build(function (err, tker) {
  tokenizer = tker;
});

const { default: srtParser2 } = require("srt-parser-2")
const parser = new srtParser2()

const emails = ['username@gmail.com', 'user02@gmail.com'];

export function MainListItem(prop) {
  const [stateItems, setItemValues] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);


  function getColor(x) {
    for (var i=0; i<prop.vocab.length; ++i) {
      if (prop.vocab[i].arr.includes(x)) {
        return prop.vocab[i].color;
      }
    }

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

  
  const handleProfileOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleClick}>
        Load .srt File
        <input type="file" accept=".srt" hidden />
      </Button>
      <IconButton>
        <SettingsIcon />
      </IconButton>
      <IconButton onClick={handleProfileOpen}>
        <SmileIcon/>
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      <ResponsiveContainer width="95%" height={400}>
        { renderItems(stateItems) }
      </ResponsiveContainer>
    </React.Fragment>
  );
}
