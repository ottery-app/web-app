import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Router from './router/Router';
import { QueryClientProvider } from 'react-query';
import { queryClient } from "./app/queryClient";
import { ThemeProvider } from './ottery-ui-new/styles/ThemeProvider';

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
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Router />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);