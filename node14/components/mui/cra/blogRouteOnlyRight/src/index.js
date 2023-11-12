import React from 'react';
import ReactDOM from 'react-dom';
// import Welcome from './App.js';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function BasicExample(props) {
  return (
    <>
      <Header />
      <Nav />
      <Footer />
    </>
  )
}

function Header(props) {
  const element =  <header>This is a header</header>;

  ReactDOM.render(
    element,
    document.getElementById('header')
  );
  return <></>;
}

function Nav(props) {
  const element = 
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/test">Test</a></li>
        </ul>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </div>;

  ReactDOM.render(
    element,
    document.getElementById('nav')
  );
  return <></>;
}

function Footer(props) {
  const element = <footer>This is a footer</footer>

  ReactDOM.render(
    element,
    document.getElementById('footer')
  );
  return <></>;
}

function Home(props) {
  const element = <h1>Home</h1>

  ReactDOM.render(
    element,
    document.getElementById('main')
  );
  return <></>;
}

function About(props) {
  const element = <h1>About</h1>

  ReactDOM.render(
    element,
    document.getElementById('main')
  );
  return <></>;
}

function Test(props) {
  const element = <h1>Test</h1>

  ReactDOM.render(
    element,
    document.getElementById('main')
  );
  return <></>;
}

ReactDOM.render(
  <BasicExample />,
  document.getElementById('header')
);