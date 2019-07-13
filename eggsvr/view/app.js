import React, { Component } from 'react';
//import HeaderComponet from './header';
export default class Layout extends Component {
  render() {
    if(EASY_ENV_IS_NODE) {
      return <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8"></meta>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"></meta>
          <meta name="keywords" content={this.props.keywords}></meta>
          <meta name="description" content={this.props.description}></meta>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
        </head>
        <body>2222222<div id="react-content">{this.props.children}</div><script src="/js/vendors~daily/daily.js"></script><script src="/js/daily/daily.js"></script></body>
      </html>;
    }
    return <div id="app">
            <h1>2222222222222</h1>
            <div>{this.props.children}</div>
        </div>;
  }
}