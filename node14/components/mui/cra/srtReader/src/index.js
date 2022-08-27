import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './App.jsx';
import intl from 'react-intl-universal';
import en_US from './lang/en_US.js';
import zh_TW from './lang/zh_TW.js';

intl.init({
  currentLocale: 'en_US',
  locales: {
    en_US,
    zh_TW
  }
});

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
