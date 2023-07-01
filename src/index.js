import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Router from './router/Router';

import { Clide } from './ottery-clide/Clide';

console.log(new Clide())

const container = document.getElementById('root');
const root = createRoot(container);

/**
 * To Ulf Svensson. The man who showed me why you shouldn't wear jeans.
 * 
 * "I praise God for this good, exciting and privileged life. I am very blessed
 * to have two daughters and a son, and five grandchildren, a heritage far more
 * than I imagined as a boy in Sweden; they are my legacy"
 * 
 * I hope to make you proud.
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);