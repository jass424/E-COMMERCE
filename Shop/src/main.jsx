import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ShopContextProvider from './assets/Components/Context/ShopContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);
