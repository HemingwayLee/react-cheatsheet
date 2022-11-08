import * as React from 'react';
import Grid from '@mui/material/Grid';
import QuizEditor from './Editor';
import Preview from './Preview';
import './App.css';

export default function EditPage() {
  const playerRef = React.useRef(null);
  const [theSelectedAvatar, setAvatar] = React.useState("N5");
  const [cardIdx, setCardIndex] = React.useState(0);
  const [ytUrl, setYtUrl] = React.useState("");
  const [allCards, setAllCards] = React.useState([{
      "title": "This is first question",
      "subheader": "grammar",
      "desc": "This is the 1st question",
      "quiz": "What is your answers?",
      "selection": {
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
      "desc": "This is the 2nd question",
      "quiz": "What is your answers?",
      "selection": {
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
      "desc": "This is the 3rd question",
      "quiz": "What is your answers?",
      "selection": {
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
      "desc": "TODO: fix cross-origin problem, This is the 4th question",
      "quiz": "What is your answers?",
      "selection": {
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

  const nextQuestion = () => {
    if (cardIdx+1 < allCards.length) {
      setCardIndex(cardIdx+1)
    }
  };

  const prevQuestion = () => {
    if (cardIdx > 0) {
      setCardIndex(cardIdx-1)
    }
  };

  const onAnswerClick = (event, idx, len) => {
    let items = [...allCards];
    items[idx].selection.answer = event.target.value
    setAllCards(items);
  }

  return (
    <Grid
      container
      spacing={3}
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={6} lg={6}>
        <QuizEditor 
          theSelectedAvatar={theSelectedAvatar} 
          setAvatar={setAvatar}
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          allCards={allCards}
          setAllCards={setAllCards}
          cardIdx={cardIdx}
          ytUrl={ytUrl}
          setYtUrl={setYtUrl}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Preview 
          theSelectedAvatar={theSelectedAvatar}
          playerRef={playerRef}
          prevQuestion={prevQuestion}
          nextQuestion={nextQuestion}
          onAnswerClick={onAnswerClick}
          allCards={allCards}
          // setAllCards={setAllCards}
          cardIdx={cardIdx}
          ytUrl={ytUrl}
        />
      </Grid>
    </Grid>
  );
}
