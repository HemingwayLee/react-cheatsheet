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
import intl from 'react-intl-universal';

const cbColors = ["#d55e0077", "#0072b277", "#cc79a777",  "#f0e44277", "#009e7377"];
// const cbColors = ["#d55e0099", "#0072b299"];

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
  const waveDivRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const timelineDivRef = React.useRef(null);
  const sidebarRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [regions, setRegions] = React.useState([]);
  const [stateVocab, setVocabValues] = React.useState([]);
  const [matchedVocab, setMatchedVocabValues] = React.useState([]);
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const [audioFilePath, setAudioFilePath] = React.useState(null);
  const [videoControls, setVideoControls] = React.useState(false);
  const [objWavesurfer, setWavesurfer] = React.useState(null);

  function getTotalSecMiliSec(ts) {
    const sec = moment.duration(ts.split(',')[0]).asSeconds();
    const ms = ts.split(',')[1]
    return sec + "." + ms;
  }

  const onPlayerPlay = () => {
    if (audioFilePath && objWavesurfer) {
      objWavesurfer.play();
    }
  }

  const onPlayerPause = () => {
    if (audioFilePath && objWavesurfer) {
      objWavesurfer.pause();
    }
  }

  const onPlayerSeek = (event) => {
    // console.log(event)
    if (audioFilePath && objWavesurfer) {
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
    if (audioFilePath && objWavesurfer) {
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
      setPlaying(true)
    }

    // if (waveDivRef && objWavesurfer) {
    //   objWavesurfer.seekTo(jump2 / objWavesurfer.getDuration());
    // }
  }

  const onHandleMatchedVocab = (arr) => {
    setMatchedVocabValues(arr)
  }

  const onHandleVocabFileLoad = (filename, fileContent) => {
    if (stateVocab.length >= cbColors.length) {
      alert(intl.get("no_more_files"))
      return
    }

    if (stateVocab.filter(v => v.name == filename).length > 0) {
      alert(intl.get("txt_file_exists"))
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
                  <MatchedChart data={matchedVocab} />
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
                    waveDiv={waveDivRef}
                    setVideoFilePath={setVideoFilePath}
                    setAudioFilePath={setAudioFilePath}
                    setVideoControls={setVideoControls}
                    player={playerRef}
                    playing={playing}
                    setPlaying={setPlaying}
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
                    waveDiv={waveDivRef} 
                    timelineDiv={timelineDivRef}
                    audioFilePath={audioFilePath}
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
