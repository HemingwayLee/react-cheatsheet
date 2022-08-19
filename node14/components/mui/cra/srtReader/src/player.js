import React from "react";
// import { ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';
import ReactPlayer from 'react-player'
import SourceDialog from './source';

export default function Mp4Player(prop) {
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const [open, setOpen] = React.useState(false);

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
        setVideoFilePath={setVideoFilePath} 
        open={open}
      />

      <ReactPlayer 
        ref={prop.player}
        url={videoFilePath} 
        width="100%" 
        height="100%" 
        controls 
      />
      
    </React.Fragment>
  );
}
