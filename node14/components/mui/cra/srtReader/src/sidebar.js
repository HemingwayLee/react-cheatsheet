import * as React from 'react';

import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from "@mui/material/IconButton";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SmileIcon from "@mui/icons-material/Mood";
import Coffee from '@mui/icons-material/Coffee';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from '@mui/material/Tooltip';
import LanguageIcon from '@mui/icons-material/Language';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { ResponsiveContainer } from 'recharts';
// import moment from 'moment';
import kuromoji from 'kuromoji';
import ProfileDialog from './profile';
import SettingsDialog from './settings';
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import parse from 'html-react-parser';
// import { getThemeProps } from '@mui/system';
import intl from 'react-intl-universal';
import en_US from './lang/en_US.js';
import zh_TW from './lang/zh_TW.js';

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

const langs = [{
  title: "English", filename: "en_US"
},{
  title: "中文(繁體)", filename: "zh_TW"
}];

const SideBarItems = ((prop, ref) => {
  const [stateItems, setItemValues] = React.useState([]);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [lowerBound, setLowerBound] = React.useState(0.0);

  // NOTE: too slow...
  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  // const handleItemSelected = (idx) => {
  //   setSelectedIndex(idx);
  // };

  const [anchorEle, setAnchorEle] = React.useState(null);
  const handleLangClick = e => {
    setAnchorEle(e.currentTarget);
  };
  
  const handleLangClose = () => {
    setAnchorEle(null);
  };

  const langItemClick = e => {
    const { myValue } = e.target.dataset;
    
    intl.init({
      currentLocale: myValue,
      locales: {
        en_US,
        zh_TW
      }
    });

    sessionStorage['lang'] = myValue;
    
    handleLangClose()

    window.location.reload();
  };

  React.useImperativeHandle(ref, () => ({
    doReRender() {
      doRedrawWithNewVocabFile()
    }
  }), [doRedrawWithNewVocabFile]);

  function getColor(x) {
    for (var i=0; i<prop.vocab.length; ++i) {
      if (prop.vocab[i].arr.includes(x)) {
        return prop.vocab[i].color;
      }
    }

    return "#ffffff00";
  }

  function doStyling(token) {
    console.log(token)

    const t = token.surface_form;

    if (token.pos === "記号" || 
      token.pos_detail_2 === "人名" ||
      token.pos_detail_1 === "数") {
      return (<span>{t}</span>);
    }

    const url = `https://jisho.org/search/${t}`;
    const mystyle = {
      backgroundColor: getColor(t),
      color: 'black',
      textDecoration: 'none'
    };

    return (<a href={url} style={mystyle} target='_blank'>{t}</a>)
  }

  function getPercentage(matchedVocabs) {
    const sum = matchedVocabs.reduce((partialSum, x) => partialSum + x.count, 0);
    return matchedVocabs.map(x => { 
      return {
        "name": x.name,
        "count": x.count,
        "color": x.color,
        "percentage": `${Math.round((x.count / sum) * 1000) / 10}%`
      }
    })
  }

  function doRedrawWithNewVocabFile() {
    let tmpMatchedVocab = doInitMatchedArr();

    let tmp = [...stateItems];
    for (var i=0; i<tmp.length; ++i) {
      tmp[i].tokens = tokenizer.tokenize(tmp[i].text).map(t => doStyling(t))
      tokenizer.tokenize(tmp[i].text).map(x => doMatching(tmpMatchedVocab, x))
    }
    setItemValues(tmp);

    prop.handleMatched(getPercentage(tmpMatchedVocab));
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

  function doMatching(tmpMatchedVocab, token) {
    if (token.pos === "記号" ||
      token.pos_detail_2 === "人名" ||
      token.pos_detail_1 === "数") {
      return;
    }
    
    const x = token.surface_form;
    for (var i=0; i<prop.vocab.length; ++i) {
      if (prop.vocab[i].arr.includes(x)) {
        tmpMatchedVocab[i].count += 1;
        return;
      }
    }
  
    tmpMatchedVocab[tmpMatchedVocab.length-1].count += 1;
  }

  function doInitMatchedArr() {
    let tmp = prop.vocab.map((x, idx) => {
      return {
        "name": prop.vocab[idx].name,
        "count": 0,
        "color": prop.vocab[idx].color
      }
    });
    
    tmp.push({
      "name": "others",
      "count": 0,
      "color": "black"
    })

    return tmp;
  }

  function initMatchedArr(result) {
    let tmpMatchedVocab = doInitMatchedArr();

    result.map(x => {
      tokenizer.tokenize(x.text).map(x => doMatching(tmpMatchedVocab, x))
    });

    prop.handleMatched(getPercentage(tmpMatchedVocab));
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

    // console.log(theRegion)

    prop.handleRegionUpdates(theRegion);
  }

  function initLines(result) {
    if (result.length > 0) {
      setLowerBound(prop.getTotalSecMiliSec(result[0].startTime));
    }
    
    const tmp = result.map(x => {
      return {
        ...x,
        "tokens": tokenizer.tokenize(x.text).map(t => doStyling(t))
      }
    });
    setItemValues(tmp);
    setRegions(result);
  }

  const renderItems = (items) => (
    <div>
      { 
        Array.isArray(items)
          ? items.map((x, idx) => {
            return (
              <ListItem key={x.id} style={{border: '1px solid #1976d2', marginTop: '2px'}}>
                <ListItemText 
                  key={"ltxt_" + x.id} 
                  primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                  primary={ x.tokens }
                  secondary={ x.startTime + " -> " + x.endTime } 
                />
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Tooltip title={intl.get("show_furigana")} arrow placement="right">
                          <ListItemButton style={{minWidth: '30px'}} key={"lbtn1_" + x.id} onClick={() => doFuriganaConvertion(x.id)}>
                            <ListItemIcon style={{minWidth: '30px'}}  key={"lico_" + x.id}>
                              <VisibilityIcon />
                            </ListItemIcon>
                          </ListItemButton>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Tooltip title={intl.get("play_this_sentence")} arrow placement="right">
                          <ListItemButton style={{minWidth: '30px'}} key={"lbtn2_" + x.id} onClick={() => {
                            // handleItemSelected(idx)
                            prop.handleJump(x.startTime)
                          }}>
                            <ListItemIcon style={{minWidth: '30px'}}  key={"lico2_" + x.id}>
                              <PlayCircleIcon />
                            </ListItemIcon>
                          </ListItemButton>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </ListItem>
            );
          }) : null
      }
    </div>
  );
  
  async function ReadFile(file) {
    return await file.text()
  }

  function ignoreCombiningMarks(res) {
    var regexSymbolWithCombiningMarks = /(\P{Mark})(\p{Mark}+)/gu;
    const stripped = res.replace(regexSymbolWithCombiningMarks, function($0, symbol, combiningMarks) {
      // console.log(`replace... ${symbol}, ${combiningMarks}`)
      return symbol;
    });
    
    return stripped;
  }
  
  function handleSrtData(data) {
    var result = parser.fromSrt(data);
    
    result = result.map(res => {
      return {
        "endTime": res.endTime,
        "id": res.id,
        "startTime": res.startTime,
        "text": ignoreCombiningMarks(res.text)
      }
    });
  
    initMatchedArr(result);
    initLines(result);
  }
  
  function handleSrtFileLoad({target}) {
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
        {intl.get('load_srt_file')}
        <input type="file" accept=".srt" hidden />
      </Button>
      <IconButton 
        disabled={stateItems.length === 0}
        onClick={handleSettingsOpen}
      >
        <SettingsIcon />
      </IconButton>
      <IconButton onClick={handleProfileOpen} disabled>
        <SmileIcon/>
      </IconButton>
      <IconButton disabled>
        <Coffee />
      </IconButton>
      <IconButton onClick={handleLangClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEle}
        keepMounted
        open={Boolean(anchorEle)}
        onClose={handleLangClose}
      >
        {langs.map((lang, idx) => (
          <MenuItem 
            onClick={langItemClick} 
            key={`lang${idx}`} 
            data-my-value={lang.filename}
          >
            {lang.title}
          </MenuItem>
        ))}
      </Menu>
      {/* <ProfileDialog 
        onClose={handleProfileClose} 
        open={profileOpen}
      /> */}
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
})

export default React.forwardRef(SideBarItems)
