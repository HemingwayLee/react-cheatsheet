import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import Home from './Home.jsx';
import Contact from './Contact.jsx';
import About from './About.jsx';

// The App need to be in this file, cannot be in App.jsx
class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">App</Link>
        <br/>
        <Link to="about">About</Link>
        <br/>
        <Link to="contact">Contact</Link>
        <br/>
        <Link to="home">Home</Link>
        {this.props.children}
      </div>
    )
  }
}

// The default page set to Home
ReactDOM.render((
  <Router history = {browserHistory}>
    <Route path = "/" component = {App}>
      <IndexRoute component = {Home} />
      <Route path = "home" component = {Home} />
      <Route path = "about" component = {About} />
      <Route path = "contact" component = {Contact} />
    </Route>
  </Router>
), document.getElementById('app'));
