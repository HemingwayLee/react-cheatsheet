import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import SignIn from './loginform';
import Dashoard from './Dashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#000000"
    }
  },
});

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashoard theme={theme}/>}/>
            <Route exact path="/login" element={<SignIn theme={theme}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default MainPage;
