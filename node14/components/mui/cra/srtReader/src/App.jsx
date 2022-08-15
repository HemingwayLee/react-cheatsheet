import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { MainListItem } from './listItems';
import VocabularyChart from './barChart';
import RecursiveTreeView from './treeView';
import CardChart from './cardChart';

const cbColors = ["#d55e0099", "#cc79a799", "#0072b299", "#f0e44299", "#009e7399"];

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

const theme = createTheme();

export default function Dashboard() {
  const [stateVocab, setVocabValues] = React.useState([]);

  const onHandleVocabFileLoad = (filename, fileContent) => {
    if (stateVocab.length >= cbColors.length) {
      alert("no more files")
      return
    }

    let tmp = [...stateVocab];

    const arr = fileContent.split("\r\n");
    // console.log(arr)

    tmp.push({
      "name": filename,
      "arr": arr,
      "count": arr.length,
      "color": cbColors[stateVocab.length]
    });

    console.log(tmp)

    setVocabValues(tmp);
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <List component="nav">
            <MainListItem vocab={stateVocab}/>
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
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  {/* <VocabularyChart data={stateVocab} /> */}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <CardChart data={stateVocab} handleVocabFileLoad={onHandleVocabFileLoad}/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <RecursiveTreeView /> */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
