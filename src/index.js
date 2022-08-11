import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyALHS_goVpo4Q0K0EDJtjy2LPDmrB5KCAQ',
  authDomain: 'react-shop-4686b.firebaseapp.com',
  projectId: 'react-shop-4686b',
  storageBucket: 'react-shop-4686b.appspot.com',
  messagingSenderId: '219594786975',
  appId: '1:219594786975:web:3110396a1a2fd611df7aaa',
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
