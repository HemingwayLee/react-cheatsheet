import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import intl from 'react-intl-universal';

export default function SettingsDialog(props) {
  const { onClose, open } = props;
  const [wordings, setWordings] = React.useState(intl.get('adjust_all_sec'));
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
        setWordings(intl.get("move_forward_sec", {seconds: sec}))
      } else {
        setWordings(intl.get("move_backward_sec", {seconds: Math.abs(sec)}))
      }

      if (parseFloat(theValue) >= bound) {
        setErrorTxt('')
        setSecVaild(true)
      } else {
        setErrorTxt(intl.get('can_not_smaller_than', {seconds: bound}))
        setSecVaild(false)
      }
    } else {
      setWordings(intl.get('adjust_all_sec'))
      setErrorTxt(intl.get('invalid_number'))
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
      <DialogTitle>{intl.get("adjust_all_subtitles")}</DialogTitle>
      <InputLabel>{wordings}</InputLabel>
      <br/>
      <TextField
        autoComplete='off'
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
