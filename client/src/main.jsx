import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./store"
import {Auth0Provider} from '@auth0/auth0-react'





ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <Auth0Provider domain='guillermobenitez.us.auth0.com' clientId='TBZtSR0lHcbhhoSIyPb4CejOnuNUkcHu' redirectUri={window.location.origin}>
     <App />
    </Auth0Provider>
  </React.StrictMode>
  </Provider>
)
