import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
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

export default function RecipeReviewCard() {
  const playerRef = React.useRef(null);

  const [expanded, setExpanded] = React.useState(false);
  const [idx, setIndex] = React.useState(0);
  const [allCards, setAllCards] = React.useState([{
      "title": "This is first question",
      "subheader": "grammar",
      "url": "https://youtu.be/eZDA1QTnRVI",
      "question": "This is the 1st question",
      "selection": {
        "label": "What is your answers?",
        "answer": "",
        "selections":[
          {"label": "<ruby>漢字<rt>かんじ</rt></ruby>"},
          {"label": "BBB"},
          {"label": "CCC"}
        ]
      }
    }, {
      "title": "This is 2nd question",
      "subheader": "vocabulary",
      "url": "https://youtu.be/U2SDrRsWx7Y",
      "question": "This is the 2nd question",
      "selection": {
        "label": "What is your answers?",
        "answer": "",
        "selections":[
          {"label": "DDD"},
          {"label": "EEE"},
          {"label": "FFF"}
        ]
      }
    }, {
      "title": "This is 3rd question",
      "subheader": "grammar",
      "url": "https://youtu.be/JI74HURlaBM",
      "question": "This is the 3rd question",
      "selection": {
        "label": "What is your answers?",
        "answer": "",
        "selections":[
          {"label": `<span style="background: red">GGG</span>`},
          {"label": "HHH"},
          {"label": "III"}
        ]
      }
    }, {
      "title": "This is 4th question",
      "subheader": "youtube video",
      "url": "https://youtu.be/o_q1e6LpX2c",
      "question": "TODO: fix cross-origin problem, This is the 4th question",
      "selection": {
        "label": "What is your answers?",
        "answer": "",
        "selections":[
          {"label": "JJJ"},
          {"label": "KKK"},
          {"label": "LLL"},
          {"label": "XZZ"}
        ]
      }
    }
  ]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const nextQuestion = () => {
    if (idx+1 < allCards.length) {
      setIndex(idx+1)
    }
  };

  const prevQuestion = () => {
    if (idx > 0) {
      setIndex(idx-1)
    }
  };

  const onAnswerClick = (event, idx) => {
    let items = [...allCards];
    items[idx].selection.answer = event.target.value
    setAllCards(items);
  }
  
  const onTextAreaChange = (event) => {
    try {
      const theJson = JSON.parse(event.target.value)
      setAllCards(theJson);
    } catch {
      console.log("not json...")
    }
  }

  return (
    <Grid
      container
      spacing={3}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={6} lg={6}>
        <h2>Input Your Json:</h2>
        <TextField
          multiline
          fullWidth
          minRows={10}
          value={JSON.stringify(allCards, null, 2)}
          inputProps={{
            style: {
              height: "600px",
            },
          }}
          onChange={(e) => {onTextAreaChange(e)}}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Card sx={{ maxWidth: 512 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>
            }
            title={allCards[idx].title}
            subheader={allCards[idx].subheader}
          />
          {/* <CardMedia
            component={allCards[idx].component}
            image={allCards[idx].image}
          /> */}
          <ReactPlayer
            // playing={prop.playing}
            ref={playerRef}
            url={allCards[idx].url} 
            config={{ 
              youtube: { 
                playerVars: { origin: 'https://www.youtube.com' } 
              } 
            }}
            width={"100%"}
            height={"512px"} 
            controls={true} 
            // onPlay={prop.onPlayerPlay}
            // onPause={prop.onPlayerPause}
            // onSeek={prop.onPlayerSeek}
          />
          <CardContent>
            <div>
              <Typography paragraph>{allCards[idx].question}</Typography>
            </div>
            <FormControl>
            <FormLabel id={"label-"+idx}>{allCards[idx].selection.label}</FormLabel>
            <RadioGroup
              aria-labelledby={"label-"+idx}
              value={allCards[idx].selection.answer}
            >
              {
                Array.isArray(allCards[idx].selection.selections) ? allCards[idx].selection.selections.map((x, i) => {
                  const theId = `quiz-${idx}-sel-${i}`
                  return (
                    <FormControlLabel key={theId} value={theId} control={<Radio onClick={(e) => {onAnswerClick(e, idx)}}/>} label={ReactHtmlParser(x.label)} />
                  )
                }) : null
              }
            </RadioGroup>
          </FormControl>
          </CardContent>
          
          <CardActions>
            <Button onClick={prevQuestion}><NavigateBeforeIcon /> Prev</Button>
            <Button onClick={nextQuestion}>Next <NavigateNextIcon /></Button>
          </CardActions>
          <CardActions disableSpacing>
            <IconButton aria-label="show hints">
              <LightbulbIcon />
            </IconButton>
            <IconButton aria-label="more info">
              <QuestionMarkIcon />
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
      </Grid>
    </Grid>
  );
}
