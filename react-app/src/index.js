import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import * as runActions from './store/runs'
import * as commentsActions from './store/comments'

const store = configureStore();


if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.runActions = runActions;
  window.commentsActions = commentsActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
