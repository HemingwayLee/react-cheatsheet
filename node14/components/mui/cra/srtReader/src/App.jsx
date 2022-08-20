import React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { SideBarItems } from './sidebar';
import MatchedChart from './barChart';
import Mp4Player from './player';
import VocabChart from './cardChart';
import WaveForm from './waveform';

// const cbColors = ["#d55e0099", "#cc79a799", "#0072b299", "#f0e44299", "#009e7399"];
const cbColors = ["#d55e0099", "#cc79a799"];

const Drawer = styled(MuiDrawer, {})(
  ({}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 360,
      boxSizing: 'border-box'
    },
  }),
);

const theme = createTheme();

export default function Dashboard() {
  const waveRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const timelineRef = React.useRef(null);
  const [regions, setRegions] = React.useState([]);
  const [stateVocab, setVocabValues] = React.useState([]);
  const [stateMatchedVocab, setMatchedVocabValues] = React.useState([]);
  const [videoFilePath, setVideoFilePath] = React.useState(null);

  function getTotalSecMiliSec(ts) {
    const sec = moment.duration(ts.split(',')[0]).asSeconds();
    const ms = ts.split(',')[1]
    return sec + "." + ms;
  }

  const onJump2Time = (ts) => {
    const jump2 = getTotalSecMiliSec(ts);

    if (playerRef) {
      playerRef.current.seekTo(parseFloat(jump2));
    }
  }

  const onHandleMatchedVocab = (arr) => {
    setMatchedVocabValues(arr)
  }

  const onHandleVocabFileLoad = (filename, fileContent) => {
    console.log(stateVocab.length)
    
    if (stateVocab.length >= cbColors.length) {
      alert("no more files")
      return
    }

    let tmp = [...stateVocab];

    const arr = fileContent.split("\r\n");
    // console.log(arr)

    tmp.push({
      "name": filename,
      "arr": arr,
      "count": arr.length,
      "color": cbColors[stateVocab.length]
    });

    // console.log(tmp)

    setVocabValues(tmp);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <List component="nav">
            <SideBarItems 
              setRegions={setRegions}
              getTotalSecMiliSec={getTotalSecMiliSec}
              setMatched={setMatchedVocabValues} 
              vocab={stateVocab} 
              handleJump={onJump2Time} 
              handleMatched={onHandleMatchedVocab}
            />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <MatchedChart data={stateMatchedVocab} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <VocabChart data={stateVocab} handleVocabFileLoad={onHandleVocabFileLoad}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Mp4Player 
                    videoFilePath={videoFilePath}
                    setVideoFilePath={setVideoFilePath}
                    player={playerRef}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <WaveForm
                    regions={regions}
                    wave={waveRef} 
                    timeline={timelineRef}
                    videoFilePath={videoFilePath}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
