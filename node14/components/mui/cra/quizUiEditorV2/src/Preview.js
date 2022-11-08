import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ReactPlayer from 'react-player'
import ReactHtmlParser from 'react-html-parser'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Preview(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h2>Preview:</h2>
      <Card sx={{ maxWidth: 512 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">{props.theSelectedAvatar}</Avatar>
          }
          title={props.allCards[props.cardIdx].title}
          subheader={props.allCards[props.cardIdx].subheader}
        />
        <ReactPlayer
          // playing={props.playing}
          ref={props.playerRef}
          url={props.ytUrl} 
          config={{ 
            youtube: { 
              playerVars: { origin: 'https://www.youtube.com' } 
            } 
          }}
          width={"100%"}
          height={"512px"} 
          controls={true} 
          // onPlay={props.onPlayerPlay}
          // onPause={props.onPlayerPause}
          // onSeek={props.onPlayerSeek}
        />
        <CardContent>
          <div>
            <Typography paragraph>{props.allCards[props.cardIdx].desc}</Typography>
          </div>
          <FormControl>
          <FormLabel id={"label-"+props.cardIdx}>{props.allCards[props.cardIdx].quiz}</FormLabel>
          <RadioGroup
            aria-labelledby={"label-"+props.cardIdx}
            value={props.allCards[props.cardIdx].selection.answer}
          >
            {
              Array.isArray(props.allCards[props.cardIdx].selection.selections) ? props.allCards[props.cardIdx].selection.selections.map((x, i) => {
                const theId = `quiz-${props.cardIdx}-sel-${i}`
                return (
                  <FormControlLabel key={theId} value={theId} control={<Radio onClick={(e) => {props.onAnswerClick(e, props.cardIdx)}}/>} label={ReactHtmlParser(x.label)} />
                )
              }) : null
            }
          </RadioGroup>
        </FormControl>
        </CardContent>
        
        <CardActions>
          <Button variant="contained" fullWidth onClick={props.prevQuestion}><NavigateBeforeIcon /> Prev</Button>
          <Button variant="contained" fullWidth onClick={props.nextQuestion}>Next <NavigateNextIcon /></Button>
        </CardActions>
        <CardActions disableSpacing>
          <IconButton aria-label="show hints">
            <LightbulbIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Ask a question"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>
              Ask a question, here...
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  )
}
