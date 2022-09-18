import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SignIn from './loginform';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={
              <div>
                <h2>Default Page Content</h2>
                <Link to="/whale">
                  <Button variant="outlined">Go to signin</Button>
                </Link>
              </div>
            }/>
            <Route exact path="/whale" element={<SignIn/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Welcome;
