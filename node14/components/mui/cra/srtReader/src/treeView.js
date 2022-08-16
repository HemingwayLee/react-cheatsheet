import React from "react";
// import { ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';
// import { v4 as uuidv4 } from 'uuid';
import ReactPlayer from 'react-player'

export default function RecursiveTreeView(prop) {
  const [videoFilePath, setVideoFilePath] = React.useState(null);

  // async function ReadFile(file) {
  //   return await file.text()
  // }

  // function handleCsvData(data, name) {
  //   console.log(data);
  // }

  function handleCapture({target}) {
    // const fileReader = new FileReader();
    
    // fileReader.readAsDataURL(target.files[0]);
    // fileReader.onload = (e) => {
    //   // const selectedFile = e.target.files[0];
    //   console.log(e);
    // };

    const selectedFile = target.files[0];
    // console.log(selectedFile);
    setVideoFilePath(URL.createObjectURL(selectedFile));

    // const promise = new Promise(resolve => {
    //   const fileContent = ReadFile(selectedFile);
    //   resolve(fileContent);
    // });

    // promise.then(fileContent => {
    //   const filename = selectedFile.name;
    //   // console.log(filename);  
    //   handleCsvData(fileContent, filename);
    // });
  }

  return (
    <React.Fragment>
      <Button variant="contained" component="label" onChange={handleCapture}>
        Load .mp4 File
        <input type="file" accept=".mp4" hidden />
      </Button>

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
