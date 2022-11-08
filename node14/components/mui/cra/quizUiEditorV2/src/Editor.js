import * as React from 'react';
import Card from '@mui/material/Card';
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

const levels = [
  "N5", "N4", "N3", "N2", "N1"
]

export default function QuizEditor(props) {
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

  return (
    <div>
      <h2>Input Your youtube video address:</h2>
      <Card>
        <CardActions>
          <TextField size='small' required label="url" value={props.ytUrl} fullWidth sx={{ marginRight:1}}/>
          <Button variant="outlined" >
            <SubtitlesIcon />&nbsp;Subtitle
          </Button>
        </CardActions>
      </Card>
      
      <table>
        <tbody>
          <tr>
            <td>
              <h2>Input Your Questions:</h2>
            </td>
            <td>
              <Button variant="outlined" fullWidth>
                <AddCircleOutlineIcon />&nbsp;Add a new question
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <Card>
        <table>
          <tbody>
            <tr>
              <td>
                <IconButton aria-label="avatar">
                  <Avatar sx={{ bgcolor: "red" }} onClick={handleAvatarClick}>{props.theSelectedAvatar}</Avatar>
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
              <td colSpan={3}><TextField required label="desc" value={props.allCards[props.cardIdx].desc} fullWidth/></td>
            </tr>
            <tr>
              <td colSpan={3}>
                <TextField required label="quiz" value={props.allCards[props.cardIdx].selection.label} fullWidth/>
                <RadioGroup
                  aria-labelledby={"label-"+props.cardIdx}
                  value={props.allCards[props.cardIdx].selection.answer}
                >
                  {
                    Array.isArray(props.allCards[props.cardIdx].selection.selections) ? props.allCards[props.cardIdx].selection.selections.map((x, i) => {
                      const theId = `editor-quiz-${props.cardIdx}-sel-${i}`
                      return (
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <FormControlLabel key={theId} control={<Radio/>} label="" />
                              </td>
                              <td>
                                <TextField required label={theId} value={x.label} fullWidth/>
                              </td>
                              <td>
                                <IconButton aria-label="delete">
                                  <DeleteForeverIcon onClick={(e)=>{deleteOption(e, props.cardIdx, i)}}/>
                                </IconButton>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )
                    }) : null
                  }
                </RadioGroup>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <Button variant="outlined" color="primary" fullWidth onClick={(e) => {addMoreOption(e, props.cardIdx, props.allCards[props.cardIdx].selection.selections.length)}}>
                  <AddCircleOutlineIcon />&nbsp;Add one more option
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <CardActions>
                  <Button variant="contained" fullWidth onClick={props.prevQuestion}><NavigateBeforeIcon /> Prev</Button>
                  <Button variant="contained" fullWidth onClick={props.nextQuestion}>Next <NavigateNextIcon /></Button>
                </CardActions>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  )
}
