import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Manatee from './Manatee';
import Narwhal from './Narwhal';
import Whale from './Whale';
import NotFound from './notfound';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <nav>
          <ul>
            <li><a href="/">Go to Manatee</a></li>
            <li><a href="/narwhal">Go to Narwhal</a></li>
            <li><a href="/whale">Go to Whale</a></li>
          </ul>
        </nav>
        <BrowserRouter>
          <Routes>
            <Route exact path="/whale" element={<Whale/>}/>
            <Route exact path="/narwhal" element={<Narwhal/>}/>
            <Route exact path="/" element={<Manatee/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default Welcome;


