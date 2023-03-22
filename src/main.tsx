import { User } from 'oidc-client-ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'tw-elements';
import { OpenAPI } from './client';


OpenAPI.BASE = import.meta.env.VITE_API_URL;

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI + window.location.pathname,
  post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI,
  scope: import.meta.env.VITE_SCOPE,
  onSigninCallback: (_user: User | void): void => {
    localStorage.setItem("isAuthenticated", "true");
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  },
  onRemoveUser: (): void => {
    console.log("User logged out");
    OpenAPI.TOKEN = undefined;
  },
  onSignoutRedirect: () : void => {
    if(localStorage.getItem("isAuthenticated") == "true")
      localStorage.setItem("isAuthenticated", "false");
    if(localStorage.getItem("roleSwitcherProviderState") !== null)
      localStorage.removeItem("roleSwitcherProviderState");
    OpenAPI.TOKEN = undefined;
    console.log("User logged out");
  },
};

console.log("starting building")

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
