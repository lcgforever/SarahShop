import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routes from './routes/index';
import Store from './store';

injectTapEventPlugin();

ReactDom.render(
  <Provider store={Store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>,
  document.getElementById('container')
);
