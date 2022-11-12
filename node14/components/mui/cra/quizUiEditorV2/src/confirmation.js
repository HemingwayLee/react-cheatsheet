import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  return (
    <div>
      <Dialog
        open={props.confirmDlgOpen}
        onClose={()=>{props.handleDlgClose(false, props.cardIdx)}}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Delete a question
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure? This will delete a question
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{props.handleDlgClose(false, props.cardIdx)}}>
            Cancel
          </Button>
          <Button onClick={()=>{props.handleDlgClose(true, props.cardIdx)}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
