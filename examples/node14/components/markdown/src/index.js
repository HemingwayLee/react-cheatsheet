import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown'
import App from './App.jsx';

const input = "# Hello  \n* Test1  \n* Test2";

ReactDOM.render(
  <div>
    <App />
    <ReactMarkdown>{input}</ReactMarkdown>
  </div>,
  document.getElementById('root')
);
