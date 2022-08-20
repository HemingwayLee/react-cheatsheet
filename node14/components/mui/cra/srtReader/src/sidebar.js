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
import Tooltip from '@mui/material/Tooltip';
import { ResponsiveContainer } from 'recharts';
// import moment from 'moment';
import kuromoji from 'kuromoji';
import ProfileDialog from './profile';
import SettingsDialog from './settings';
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
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [lowerBound, setLowerBound] = React.useState(0.0);

  // TODO: redraw after new vocab coming
  // const [vacab, setVocab] = React.useState([...prop.vocab]);

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
        const mystyle = {
          backgroundColor: getColor(t.surface_form)
        };

        const res = parse(await kuroshiro.convert(t.surface_form, {
          mode: "furigana", 
          to: "hiragana"
        }))
        
        const finalHtml = (<span style={mystyle}> {res} </span>);
        
        return finalHtml;
      });


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

  function setRegions(arr) {
    const theRegion = arr.map(x => {
      return {
        start: prop.getTotalSecMiliSec(x.startTime),
        end: prop.getTotalSecMiliSec(x.endTime),
        loop: false,
        drag: false,
        resize: false,
        attributes: {
          label: x.text
        },
        color: 'rgba(255, 0, 0, 0.5)',
      }
    })

    console.log(theRegion)

    prop.handleRegionUpdates(theRegion);
  }

  function initLines(result) {
    if (result.length > 0) {
      setLowerBound(prop.getTotalSecMiliSec(result[0].startTime));
    }
    
    const tmp = result.map(x => {
      return {
        ...x,
        "tokens": tokenizer.tokenize(x.text).map(t => doStyling(t.surface_form))
      }
    });
    setItemValues(tmp);
    setRegions(result);
  }

  const renderItems = (items) => (
    <div>
      { 
        Array.isArray(items)
          ? items.map(x => {
            return (
              <ListItem key={x.id}>
                <Tooltip title="Show Furigana (beta)">
                  <ListItemButton key={"lbtn1_" + x.id} onClick={() => doFuriganaConvertion(x.id)}>
                    <ListItemIcon key={"lico_" + x.id}>
                      <VisibilityIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
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
    // console.log(result);
  
    initMatchedArr(result);
    initLines(result);
  }
  
  function handleSrtFileLoad({target}) {
    const selectedFile = target.files[0];
    
    const promise = new Promise(resolve => {
      const fileContent = ReadFile(selectedFile);
      resolve(fileContent);
    });
  
    promise.then(fileContent => {
      const filename = selectedFile.name;
      // console.log(filename);
  
      handleSrtData(fileContent);
    });
  }

  function toHHMMSS (sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  function doShift(ts, offset) {
    // console.log(`${ts} ===> ${offset}`)
    const totalSec = prop.getTotalSecMiliSec(ts);
    const res = Math.round((parseFloat(totalSec) + parseFloat(offset) + Number.EPSILON) * 1000) / 1000;
    const tmp = res.toFixed(3).toString().split('.');
    const timeFormat = toHHMMSS(tmp[0])

    if (tmp.length > 1) {
      return `${timeFormat},${tmp[1]}`
    } else {
      return `${timeFormat},000`;
    }
  }

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };
  
  const handleProfileOpen = () => {
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
  };

  const handleShiftTime = (sec) => {
    // console.log(sec)

    let tmp = [...stateItems];
    for (var i=0; i<tmp.length; ++i) {
      tmp[i].startTime = doShift(tmp[i].startTime, sec)
      tmp[i].endTime = doShift(tmp[i].endTime, sec)
    }
    setItemValues(tmp)
    setRegions(tmp);
  }

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleSrtFileLoad}>
        Load .srt File
        <input type="file" accept=".srt" hidden />
      </Button>
      <IconButton 
        disabled={stateItems.length === 0}
        onClick={handleSettingsOpen}
      >
        <SettingsIcon />
      </IconButton>
      <IconButton disabled onClick={handleProfileOpen}>
        <SmileIcon/>
      </IconButton>
      <IconButton disabled>
        <Coffee />
      </IconButton>
      <ProfileDialog 
        onClose={handleProfileClose} 
        open={profileOpen}
      />
      <SettingsDialog 
        lowerBound={lowerBound}
        shiftStartTime={handleShiftTime}
        onClose={handleSettingsClose} 
        open={settingsOpen} 
      />
      <ResponsiveContainer width="95%" height={400}>
        { renderItems(stateItems) }
      </ResponsiveContainer>
    </React.Fragment>
  );
}
