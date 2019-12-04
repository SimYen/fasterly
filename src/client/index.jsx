import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './style.scss';

const app = document.getElementById("app")

if ( app !== null ) {
    ReactDOM.render(<App />, app);
}