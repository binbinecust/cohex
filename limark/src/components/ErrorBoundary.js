import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { logToServer } from './utils/log';

class ErrorBoundary extends Component {

  componentDidCatch(error, info){
    // eslint-disable-next-line no-console
    console.error(error, info);
    logToServer(error.message, window.location.href, 0, 0, {
      message: error.message,
      stack: `${error.stack}\ncomponentStack:\n${info.componentStack}`
    });
  }

  render() {
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
