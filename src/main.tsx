import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'tw-elements';
import { OpenAPI } from './client';

// import { Buffer } from 'buffer';

// Buffer.from("anything", "base64");
// window.Buffer = window.Buffer || Buffer

OpenAPI.BASE = import.meta.env.VITE_API_URL;
export const MQTT_BASE = import.meta.env.VITE_MQTT_HOSTNAME


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/* <BrowserRouter> */}
          <App />
      {/* </BrowserRouter> */}
  </React.StrictMode>
)
