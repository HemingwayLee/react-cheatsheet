import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
// TODO: does not work for now
// import ReactMarkdown from 'https://cdn.skypack.dev/react-markdown@7?dts'
import App from './App.jsx';

const input = "# Hello  \n* Test1  \n* Test2";

ReactDOM.render(
  <div>
    <App />
    <hr/>
    <ReactMarkdown>{input}</ReactMarkdown>
  </div>,
  document.getElementById('root')
);
