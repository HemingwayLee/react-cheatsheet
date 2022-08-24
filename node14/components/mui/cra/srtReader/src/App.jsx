import React from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import SideBarItems from './sidebar';
import MatchedChart from './barChart';
import Mp4Player from './player';
import VocabChart from './cardChart';
import WaveForm from './waveform';

// const cbColors = ["#d55e0099", "#0072b299", "#cc79a799",  "#f0e44299", "#009e7399"];
const cbColors = ["#d55e0099", "#0072b299"];

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
  const sidebarRef = React.useRef(null);
  const [regions, setRegions] = React.useState([]);
  const [stateVocab, setVocabValues] = React.useState([]);
  const [stateMatchedVocab, setMatchedVocabValues] = React.useState([]);
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const [videoControls, setVideoControls] = React.useState(false);
  const [objWavesurfer, setWavesurfer] = React.useState(null);

  function getTotalSecMiliSec(ts) {
    const sec = moment.duration(ts.split(',')[0]).asSeconds();
    const ms = ts.split(',')[1]
    return sec + "." + ms;
  }

  const onPlayerPlay = () => {
    if (waveRef && objWavesurfer) {
      objWavesurfer.play();
    }
  }

  const onPlayerPause = () => {
    if (waveRef && objWavesurfer) {
      objWavesurfer.pause();
    }
  }

  const onPlayerSeek = (event) => {
    // console.log(event)
    if (waveRef && objWavesurfer) {
      objWavesurfer.seekTo(event / objWavesurfer.getDuration());
    }
  }

  const onWaveDrawnReady = () => {
    if (playerRef) {
      setVideoControls(true)
    }
  }

  const onHandleRegionUpdates = (theRegions) => {
    setRegions(theRegions);
    if (waveRef && objWavesurfer) {
      objWavesurfer.clearRegions();
      for (var i=0; i<theRegions.length; ++i) {
        objWavesurfer.addRegion(theRegions[i])
      }
    }
  }

  const onJump2Time = (ts) => {
    const jump2 = parseFloat(getTotalSecMiliSec(ts));

    if (playerRef) {
      playerRef.current.seekTo(jump2);
    }

    // if (waveRef && objWavesurfer) {
    //   objWavesurfer.seekTo(jump2 / objWavesurfer.getDuration());
    // }
  }

  const onHandleMatchedVocab = (arr) => {
    setMatchedVocabValues(arr)
  }

  const onHandleVocabFileLoad = (filename, fileContent) => {
    if (stateVocab.length >= cbColors.length) {
      alert("no more files")
      return
    }

    if (stateVocab.filter(v => v.name == filename).length > 0) {
      alert("file exists")
      return
    }

    let tmp = [...stateVocab];
    const arr = fileContent.split("\r\n");
    tmp.push({
      "name": filename,
      "arr": arr,
      "count": arr.length,
      "color": cbColors[stateVocab.length]
    });

    setVocabValues(tmp);

    if (sidebarRef) {
      sidebarRef.current.doReRender();
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <List component="nav">
            <SideBarItems 
              ref={sidebarRef}
              handleRegionUpdates={onHandleRegionUpdates}
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
                    videoControls={videoControls}
                    setVideoFilePath={setVideoFilePath}
                    setVideoControls={setVideoControls}
                    player={playerRef}
                    objWavesurfer={objWavesurfer}
                    onPlayerPlay={onPlayerPlay}
                    onPlayerPause={onPlayerPause}
                    onPlayerSeek={onPlayerSeek}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <WaveForm
                    setWavesurfer={setWavesurfer}
                    regions={regions}
                    wave={waveRef} 
                    timeline={timelineRef}
                    videoFilePath={videoFilePath}
                    waveDrawnReady={onWaveDrawnReady}
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
