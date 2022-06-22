import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Third part
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Styles
import './assets/css/styles.css';
import './assets/css/icones.css';

// Views
import App from './App';

// Font Awesome Globally
library.add(fas);

const root = ReactDOM.createRoot(
  document.getElementById('root'),
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
