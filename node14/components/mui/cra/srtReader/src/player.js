import React from "react";
// import { ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';
// import { v4 as uuidv4 } from 'uuid';
import ReactPlayer from 'react-player'
import SourceDialog from './source';

export default function Mp4Player(prop) {
  const [videoFilePath, setVideoFilePath] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  function handleCapture({target}) {
    const selectedFile = target.files[0];
    setVideoFilePath(URL.createObjectURL(selectedFile));
  }

  const handleSourceOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleCapture}>
        Load .mp4 File
        <input type="file" accept=".mp4" hidden />
      </Button>

      <Button variant="contained" component="label" onClick={handleSourceOpen}>
        Load source
      </Button>

      <SourceDialog onClose={handleClose} open={open}/>

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
