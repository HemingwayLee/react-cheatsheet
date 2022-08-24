import React from "react";
import Button from '@mui/material/Button';
import ReactPlayer from 'react-player'
import SourceDialog from './source';

export default function Mp4Player(prop) {
  // const [videoFilePath, setVideoFilePath] = React.useState('https://cdn.zoubuting.com/20210719/2pNrlteZ/1000kb/hls/index.m3u8');
  const [open, setOpen] = React.useState(false);
  const [videoHeight, setVideoHeight] = React.useState('100%');

  const handleSourceOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onClick={handleSourceOpen}>
        Load source
      </Button>

      <SourceDialog 
        onClose={handleClose}
        setVideoFilePath={prop.setVideoFilePath} 
        setVideoHeight={setVideoHeight}
        objWavesurfer={prop.objWavesurfer}
        open={open}
      />

      <ReactPlayer
        // TODO: Not working yet..., use personal control?
        // onKeyPress={Keyboard.dismiss}
        ref={prop.player}
        url={prop.videoFilePath} 
        config={{ 
          youtube: { 
            playerVars: { origin: 'https://www.youtube.com' } 
          } 
        }}
        width={"100%"}
        height={videoHeight} 
        controls={prop.videoControls} 
        onPlay={prop.onPlayerPlay}
        onPause={prop.onPlayerPause}
        // onProgress={prop.onPlayerProgress}
      />
      
    </React.Fragment>
  );
}
