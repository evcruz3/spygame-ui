import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'tw-elements';

// import { Buffer } from 'buffer';

// Buffer.from("anything", "base64");
// window.Buffer = window.Buffer || Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/* <BrowserRouter> */}
          <App />
      {/* </BrowserRouter> */}
  </React.StrictMode>
)
