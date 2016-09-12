/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';




import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css'; //Webpack can import CSS files too!
import './styles/site.scss'; //Webpack can import SCSS files too!


import './assets/images/progress.png'; //Tell webpack to load progress.png

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
