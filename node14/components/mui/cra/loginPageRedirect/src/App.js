import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './loginform';
import Dashoard from './Dashboard';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashoard/>}/>
            <Route exact path="/login" element={<SignIn/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Welcome;
