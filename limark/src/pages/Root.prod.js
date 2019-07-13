import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import ErrorBoundary from '../components/ErrorBoundary';

export default class Root extends Component {
  render() {
    const {store, history, routes} = this.props;
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <Router history={history} routes={routes}/>
        </Provider>
      </ErrorBoundary>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};
