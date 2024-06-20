import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import intl from 'react-intl-universal';

export default function EditingDialog(props) {
  const { onClose, open } = props;
  const [errorTxt, setErrorTxt] = React.useState('');
  const [isSecVaild, setSecVaild] = React.useState(false);
  const [secStart, setSecStart] = React.useState(props.sec1);
  const [secEnd, setSecEnd] = React.useState(props.sec2);
  const [text, setText] = React.useState(props.text);

  React.useEffect(() => {
    setSecStart(props.sec1);
    setSecEnd(props.sec2);
    setText(props.text);
  }, [props.sec1, props.sec2, props.text]);

  const handleClose = () => {
    onClose();
  };

  const handleSecUpdate = () => {
    props.completeEditing(text, secStart, secEnd);

    onClose();
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function handleSec1Change(event) {
    const theValue = event.target.value;
    setSecStart(theValue);
  }

  function handleSec2Change(event) {
    const theValue = event.target.value;
    setSecEnd(theValue);
  }

  function handleTxtChange(event) {
    const theValue = event.target.value;
    setText(theValue);
  }

  return (
    <Dialog 
      // fullWidth 
      // maxWidth="sm" 
      onClose={handleClose} 
      open={open}
    >
      <DialogTitle>{intl.get("adjust_all_subtitles")}</DialogTitle>
      <br/>
      <TextField
        autoComplete='off'
        value={text}
        // error={!isSecVaild}
        required
        helperText={errorTxt}
        id="outlined-required"
        label="Required"
        onChange={handleTxtChange}
      />
      <TextField
        autoComplete='off'
        value={secStart}
        // error={!isSecVaild}
        required
        helperText={errorTxt}
        id="outlined-required"
        label="Required"
        onChange={handleSec1Change}
      />
      <TextField
        autoComplete='off'
        value={secEnd}
        // error={!isSecVaild}
        required
        helperText={errorTxt}
        id="outlined-required"
        label="Required"
        onChange={handleSec2Change}
      />
      <Button 
        // disabled={!isSecVaild}
        variant="contained" 
        component="label" 
        onClick={handleSecUpdate}>
        Confirm
      </Button>
    </Dialog>
  );
}
