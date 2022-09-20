import Button from '@mui/material/Button';
import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Navigate, useNavigate } from 'react-router-dom'
import { styled, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

const Drawer = styled(MuiDrawer, {})(
  ({}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 360,
      boxSizing: 'border-box'
    },
  }),
);

export default function Dashboard(prop) {
  const isLoggedIn = true;
  const navigate = useNavigate();

  function showPromiseResult(myJson) {
    alert(myJson["result"]);
  }

  const doInsert = () => {
    fetch('/api/insert/', {
      method: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    })
    .then(async function(response) {
      if (response.status === 200) {
        const data = await response.json();
        return showPromiseResult(data);
      } else if (response.status === 401) {
        navigate('/login')
      } else {
        alert("unknow error")
      }
    })
  }
  
  const showPerson = () => {
    fetch('/api/show1/', {
      method: 'GET',
    })
    .then(async function(response) {
      if (response.status === 200) {
        const data = await response.json();
        return showPromiseResult(data);
      } else if (response.status === 401) {
        navigate('/login')
      } else {
        alert("unknow error")
      }
    });
  }

  const doSignout = () => {
    fetch('/api/signout/', {
      method: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    })
    .then(async function(response) {
      if (response.status === 200) {
        alert("logout succeeded !!")
      } else if (response.status === 401) {
        navigate('/login')
      } else {
        alert("unknow error")
      }
    });
  }
  
  return isLoggedIn ? (
    <ThemeProvider theme={prop.theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <List component="nav">
            <Button variant="contained" component="label"  onClick={doInsert}>Insert Data</Button>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained" component="label" onClick={showPerson}>Show Person</Button>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Button variant="contained" component="label" onClick={()=>{alert("!!!!")}}>Alert</Button>
                  <Button variant="contained" component="label" onClick={doSignout}>Signout</Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  ) : (
    <Navigate to={{ pathname: '/login' }} />
  );
}
