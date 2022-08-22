import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import doCaesarCipher from './shift'

const links = [
  { 
    name: doCaesarCipher('Xfcqbhf', -1), 
    uri: doCaesarCipher('iuuqt;00ifnjohxbzmff/hjuivc/jp0', -1),
    icon: (props) => <PersonIcon {...props} /> 
  },
  { 
    name: doCaesarCipher('Gbdfcppl', -1), 
    uri: doCaesarCipher('iuuqt;00xxx/gbdfcppl/dpn0qsbdjowfstf', -1),
    icon: (props) => <FacebookIcon {...props} /> 
  },
  {
    name: doCaesarCipher('Jotubhsbn', -1),
    uri: doCaesarCipher('iuuqt;00xxx/jotubhsbn/dpn0mffifnjohxbz15250', -1),
    icon: (props) => <InstagramIcon {...props} /> 
  }
];

export default function ProfileDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Contact Me</DialogTitle>
      <List sx={{ pt: 0 }}>
        {
          links.map((link) => {
            return (
              <ListItem button component="a" href={link.uri} key={link.name} target="_blank">
                <ListItemAvatar>
                  <Avatar>
                    <link.icon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={link.name} />
              </ListItem>
            )
          })
        }
      </List>
    </Dialog>
  );
}
