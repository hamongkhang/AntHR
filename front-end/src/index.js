import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login';
import Login2 from './Components/Login2';
import './Components/Login.css';
import './Components/Login2.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// npm i --save react-bootstrap
ReactDOM.render(
  <React.StrictMode>
    {/* <Login /> */}
    <Login2 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
