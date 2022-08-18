import * as React from 'react';

import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from "@mui/material/IconButton";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SmileIcon from "@mui/icons-material/Mood";
import Coffee from '@mui/icons-material/Coffee';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from '@mui/material/Typography';
import { ResponsiveContainer } from 'recharts';
import kuromoji from 'kuromoji';
import ProfileDialog from './profile';
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import parse from 'html-react-parser';

const kuroshiro = new Kuroshiro();

(async () => {
  await kuroshiro.init(new KuromojiAnalyzer({dictPath: '/dict/kuromoji'}));
})();

// console.log(` in the build? ${process.env.PUBLIC_URL}`);

var tokenizer = null;
kuromoji.builder({ dicPath: '/dict/kuromoji' }).build(function (err, tker) {
  tokenizer = tker;
});

const { default: srtParser2 } = require("srt-parser-2")
const parser = new srtParser2()

export function SideBarItems(prop) {
  const [stateItems, setItemValues] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  function getColor(x) {
    for (var i=0; i<prop.vocab.length; ++i) {
      if (prop.vocab[i].arr.includes(x)) {
        return prop.vocab[i].color;
      }
    }

    return "#ffffff00";
  }

  function doStyling(t) {
    const mystyle = {
      backgroundColor: getColor(t)
    };

    return (<span style={mystyle}> {t} </span>)
  }

  function doFuriganaConvertion (id) {
    (async () => {
      let tmp = [...stateItems];

      const foundIndex = tmp.findIndex(x => x.id == id);
      
      let theOne = tmp.filter(x => x.id == id);

      const see = tokenizer.tokenize(theOne[0].text).map(async t => {
        // (async () => {
          const mystyle = {
            backgroundColor: getColor(t.surface_form)
          };

          const res = parse(await kuroshiro.convert(t.surface_form, {
            mode: "furigana", 
            to: "hiragana"
          }))
          
          const finalHtml = (<span style={mystyle}> {res} </span>);
          console.log(finalHtml)

          return finalHtml;
        // })();
      });

      console.log("!!!!!???")
      console.log(await Promise.all(see));
      console.log("!!!!!???")

      // theOne[0].tokens = parse(await kuroshiro.convert(theOne[0].text, {
      //   mode: "furigana", 
      //   to: "hiragana"
      // }));

      theOne[0].tokens = await Promise.all(see);
      tmp[foundIndex] = theOne[0];
      setItemValues(tmp)
    })();
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

  function initLines(result) {
    const tmp = result.map(x => {
      return {
        ...x,
        "tokens": tokenizer.tokenize(x.text).map(t => doStyling(t.surface_form))
      }
    });

    setItemValues(tmp);
  }

  const renderItems = (items) => (
    <div>
      { 
        Array.isArray(items)
          ? items.map(x => {
            // doTokenization(x);
            return (
              <ListItem key={x.id}>
                <ListItemButton key={"lbtn1_" + x.id} onClick={() => doFuriganaConvertion(x.id)}>
                  <ListItemIcon key={"lico_" + x.id}>
                    <VisibilityIcon />
                  </ListItemIcon>
                </ListItemButton>
                <ListItemButton key={"lbtn2_" + x.id} onClick={() => prop.handleJump(x.startTime)}>
                  <ListItemText 
                    key={"ltxt_" + x.id} 
                    primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                    primary={ x.tokens }
                    secondary={ x.startTime + " -> " + x.endTime } 
                  />
                </ListItemButton>
              </ListItem>
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

    initLines(result);
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

  const handleClose = () => {
    setOpen(false);
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
      <IconButton>
        <Coffee />
      </IconButton>
      <ProfileDialog onClose={handleClose} open={open}/>
      <ResponsiveContainer width="95%" height={400}>
        { renderItems(stateItems) }
      </ResponsiveContainer>
    </React.Fragment>
  );
}
