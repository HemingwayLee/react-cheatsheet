import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { mainListItems } from './listItems';

function Main() {
  return <><h2>Main</h2><div>Type anything on url, it will go to NotFound</div></>;
}

function Order() {
  return <h2>Order</h2>;
}

function Customer() {
  return <h2>Customer</h2>;
}

function NotFound() {
  return <h2>NotFound</h2>;
}

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {})(
  ({}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box'
    },
  }),
);


class Dashboard extends React.Component {
  render() {
    return (
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <List component="nav">
            { mainListItems }
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: "#AAAAAA",
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={12}>
                <Paper>
                  <BrowserRouter>
                    <Routes>
                      <Route exact path="/" element={<Main/>}/>
                      <Route exact path="/main" element={<Main/>}/>
                      <Route exact path="/order" element={<Order/>}/>
                      <Route exact path="/customer" element={<Customer/>}/>
                      <Route path="*" element={<NotFound/>}/>
                    </Routes>
                  </BrowserRouter>
                </Paper>
              </Grid>
              <Grid item lg={12}>
                <Paper>
                  <div>I am a div tag</div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    );
  }
}

export default Dashboard;
