/* eslint-disable functional/no-expression-statements */
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as path from 'path';
// import express from 'express';

import App from './App';
import store from './slices/index.js';
import './i18n';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
};

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (err) {
      res.status(500).send(err);
    }
  });
});

app();
