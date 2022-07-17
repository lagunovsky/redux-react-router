import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store';
import { ReduxRouter } from '@lagunovsky/redux-react-router'

import AppRoutes from './App';

import browserHistory from './history';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ReduxRouter
      history={browserHistory}
      children={<AppRoutes/>}
    />
  </Provider>
);
