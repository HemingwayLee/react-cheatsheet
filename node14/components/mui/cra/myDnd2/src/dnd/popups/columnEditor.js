import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
// import intl from 'react-intl-universal';

const ColumnNameDialog = React.forwardRef((props, ref) => {
  const { onClose, open } = props;
  const [wordings, setWordings] = React.useState();
  const [errorTxt, setErrorTxt] = React.useState('');
  const [isSecVaild, setSecVaild] = React.useState(false);
  
  const handleClose = () => {
    onClose();
  };

  const handleTitleUpdate = () => {
    onClose();
  };

  const handleSecChange = (event) => {
    const theValue = event.target.value;
    setWordings(theValue);
    if (theValue === '') {
      setErrorTxt('Can not be empty')
      setSecVaild(false)
    } else {
      setErrorTxt('')
      setSecVaild(true)
    }
  }

  React.useImperativeHandle(ref, () => ({
    setWordingsFromParent(wording) {
      setWordings(wording)
    }
  }), [setWordings]);

  return (
    <Dialog 
      onClose={handleClose} 
      open={open}
    >
      {/* <DialogTitle>{intl.get("adjust_all_subtitles")}</DialogTitle> */}
      <DialogTitle>{"Edit Column Name"}</DialogTitle>
      {/* <InputLabel>{wordings}</InputLabel> */}
      {/* <br/> */}
      <TextField
        autoComplete='off'
        value={wordings}
        error={!isSecVaild}
        required
        helperText={errorTxt}
        id="outlined-required"
        label="Required"
        onChange={handleSecChange}
      />
      <Button
        variant="contained" 
        component="label" 
        onClick={handleTitleUpdate}>
        Confirm
      </Button>
    </Dialog>
  );
})

export default ColumnNameDialog;
