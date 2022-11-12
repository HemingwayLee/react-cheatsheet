import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Avatar from '@mui/material/Avatar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CardActions from '@mui/material/CardActions';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import getVideoId from 'get-video-id';
import QuizPage from './quizPagination';

const levels = [
  "N5", "N4", "N3", "N2", "N1"
]

export default function QuizEditor(props) {
  const [ytErrorTxt, setYtErrorTxt] = React.useState('');
  const [isYtUrlVaild, setYtUrlVaild] = React.useState(false);

  const deleteOption = (e, idx, i) => {
    let items = [...props.allCards];
    items[idx].selection.selections;
    for (let j = items[idx].selection.selections.length; j--;) {
      if (j === i) {
        items[idx].selection.selections.splice(i, 1);
      }
    }

    props.setAllCards(items);
  }

  const addMoreOption = (event, idx, len) => {
    let items = [...props.allCards];
    items[idx].selection.selections.push({
      "label": `Option ${len}`
    })
    props.setAllCards(items);
  }

  const [anchorEle, setAnchorEle] = React.useState(null);
  const handleAvatarClick = e => {
    setAnchorEle(e.currentTarget);
  };
  
  const handleAvatarClose = () => {
    setAnchorEle(null);
  };

  const AvatarItemClick = e => {
    const { myValue } = e.target.dataset;

    props.setAvatar(myValue)
    handleAvatarClose()
  };

  const handleKeyChange = (e, idx, key) => {
    let items = [...props.allCards];
    items[idx][key] = e.target.value;

    props.setAllCards(items);
  }

  const handleOptionChange = (e, idx, i) => {
    let items = [...props.allCards];
    items[idx]["selection"]["selections"][i]["label"] = e.target.value;

    props.setAllCards(items);
  }

  const addNewQuestion = (e) => {
    let items = [...props.allCards];
    items.push({
      "title": "This is a new question",
      "subheader": "grammar",
      "desc": "This is a new question",
      "quiz": "What is your answers?",
      "selection": {
        "answer": "",
        "selections":[
          {"label": `<span style="background: red">GGG</span>`},
          {"label": "HHH"},
          {"label": "III"}
        ]
      }
    });

    props.setAllCards(items);
  }

  const deleteTheQuestion = (e) => {
    
  }

  const handleUrlChange = (e) => {
    const url = e.target.value;
    props.setYtUrl(url)

    if (checkYtUrl(url)) {
      setYtErrorTxt('')
      setYtUrlVaild(true)
    } else {
      // setYtErrorTxt(intl.get('invalid_youtube_url'))
      setYtErrorTxt('invalid_youtube_url')
      setYtUrlVaild(false)
    }
  }

  function checkYtUrl(url) {
    const {id} = getVideoId(url);
    if (id) {
      return true;
    }

    return false;
  }


  return (
    <div>
      <h2>Input Your youtube video address:</h2>
      <Card>
        <CardActions>
          <TextField 
            id="outlined-required"
            size='small' 
            required 
            label="url" 
            value={props.ytUrl} 
            error={!isYtUrlVaild}
            helperText={ytErrorTxt}
            fullWidth 
            onChange={handleUrlChange}
            sx={{ marginRight:1}}
          />
          <Button variant="outlined" >
            <SubtitlesIcon />&nbsp;Subtitle
          </Button>
        </CardActions>
      </Card>
      <hr/>
      <table>
        <tbody>
          <tr>
            <td>
              <QuizPage 
                count={props.allCards.length}
                setCardIndex={props.setCardIndex}
              />
            </td>
            <td>
              <Button variant="outlined" onClick={addNewQuestion} >
                <AddCircleOutlineIcon />&nbsp;Add a new question
              </Button>
            </td>
          </tr>
        </tbody>
      </table> 
      <h2>Input Your Question No. {props.cardIdx+1}</h2>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={deleteTheQuestion}>
              <DeleteForeverIcon  />
            </IconButton>
          }
        >
        </CardHeader>
        <table>
          <tbody>
            <tr>
              <td>
                <IconButton onClick={handleAvatarClick} aria-label="avatar">
                  <Avatar sx={{ bgcolor: "red" }}>{props.theSelectedAvatar}</Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEle}
                  keepMounted
                  open={Boolean(anchorEle)}
                  onClose={handleAvatarClose}
                >
                  {levels.map((lv, idx) => (
                    <MenuItem 
                      onClick={AvatarItemClick} 
                      key={`lv-${idx}`} 
                      data-my-value={lv}
                    >
                      {lv}
                    </MenuItem>
                  ))}
                </Menu>
              </td>
              <td><TextField onChange={(e) => {handleKeyChange(e, props.cardIdx, "title")}} required label="title" value={props.allCards[props.cardIdx].title} fullWidth/></td>
              <td><TextField onChange={(e) => {handleKeyChange(e, props.cardIdx, "subheader")}} label="subheader" value={props.allCards[props.cardIdx].subheader} fullWidth/></td>
            </tr>
            <tr>
              <td colSpan={3}>
                <TextField onChange={(e) => {handleKeyChange(e, props.cardIdx, "desc")}} required label="desc" value={props.allCards[props.cardIdx].desc} fullWidth/>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <TextField onChange={(e) => {handleKeyChange(e, props.cardIdx, "quiz")}} required label="quiz" value={props.allCards[props.cardIdx].quiz} fullWidth/>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <RadioGroup
                  aria-labelledby={"label-"+props.cardIdx}
                  value={props.allCards[props.cardIdx].selection.answer}
                >
                  <table>
                    <tbody>
                      {
                        Array.isArray(props.allCards[props.cardIdx].selection.selections) ? props.allCards[props.cardIdx].selection.selections.map((x, i) => {
                          const theId = `editor-quiz-${props.cardIdx}-sel-${i}`
                          return (
                            <tr>
                              <td>
                                <FormControlLabel key={theId} control={<Radio/>} label="" />
                              </td>
                              <td>
                                <TextField onChange={(e) => {handleOptionChange(e, props.cardIdx, i)}}  required label={theId} value={x.label} fullWidth/>
                              </td>
                              <td>
                                <IconButton onClick={(e)=>{deleteOption(e, props.cardIdx, i)}} aria-label="delete">
                                  <DeleteForeverIcon />
                                </IconButton>
                              </td>
                            </tr>
                          )
                        }) : null
                      }
                      <tr>
                        <td></td>
                        <td>
                          {/* <TextField style={{backgroundColor: '#F0F0F0'}} disabled fullWidth/> */}
                        </td>
                        <td>
                          <IconButton onClick={(e) => {addMoreOption(e, props.cardIdx, props.allCards[props.cardIdx].selection.selections.length)}}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </RadioGroup>
              </td>
            </tr>
            {/* <tr>
              <td colSpan={3}>
                <CardActions>
                  <Button variant="contained" fullWidth onClick={props.prevQuestion}><NavigateBeforeIcon /> Prev</Button>
                  <Button variant="contained" fullWidth onClick={props.nextQuestion}>Next <NavigateNextIcon /></Button>
                </CardActions>
              </td>
            </tr> */}
          </tbody>
        </table>
      </Card>
      {/* <Card style={{marginTop: "10px", backgroundColor: "#F0F0F0", padding: "15px"}}>
        
      </Card> */}
    </div>
  )
}
