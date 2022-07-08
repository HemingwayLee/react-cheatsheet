import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);
