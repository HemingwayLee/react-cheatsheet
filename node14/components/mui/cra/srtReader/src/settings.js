import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

export default function SettingsDialog(props) {
  const { onClose, open } = props;
  const [wordings, setWordings] = React.useState('調整全部字幕秒數');
  const [errorTxt, setErrorTxt] = React.useState('');
  const [isSecVaild, setSecVaild] = React.useState(false);
  const [sec, setSecond] = React.useState('');

  const handleClose = () => {
    onClose();
  };

  const handleSecUpdate = () => {
    // props.setVideoHeight('640px')
    // props.setVideoFilePath(ytUrl);
    props.shiftStartTime(sec)

    onClose();
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function handleSecChange(event) {
    const theValue = event.target.value;
    setSecond(theValue)
    
    const bound = (-1) * parseFloat(props.lowerBound)
    if (isNumeric(theValue)) {
      const sec = parseFloat(theValue);
      if (sec >= 0.0) {
        setWordings(`全部字幕往後${sec}秒`)
      } else {
        setWordings(`全部字幕往前${Math.abs(sec)}秒`)
      }


      if (parseFloat(theValue) >= bound) {
        setErrorTxt('')
        setSecVaild(true)
      } else {
        setErrorTxt(`can not small than ${bound}`)
        setSecVaild(false)
      }
    } else {
      setWordings('調整全部字幕秒數')
      setErrorTxt('Invalid number')
      setSecVaild(false)
    }
  }

  return (
    <Dialog 
      // fullWidth 
      // maxWidth="sm" 
      onClose={handleClose} 
      open={open}
    >
      <DialogTitle>Adjust all subtitles</DialogTitle>
      <InputLabel>{wordings}</InputLabel>
      <br/>
      <TextField
        value={sec}
        error={!isSecVaild}
        required
        helperText={errorTxt}
        id="outlined-required"
        label="Required"
        onChange={handleSecChange}
      />
      <Button 
        disabled={!isSecVaild}
        variant="contained" 
        component="label" 
        onClick={handleSecUpdate}>
        Confirm
      </Button>
    </Dialog>
  );
}
