import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/account.css';
import Document from "./components/document";
import './css/document.css';
// import Doc from "./components/doc";

ReactDOM.render(
  <React.StrictMode>
    <Document />
    {/* <Doc /> */}
    {/* <App />  */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
