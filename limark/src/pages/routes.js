import React from 'react';
import {Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import {config} from '../config';


const App = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./app').default);
  }, 'App');
};

const Daily = (nextState, callback) => {
  require.ensure([], function(require) {
    callback(null, require('./Daily').default);
  }, 'Daily');
}; 

export default (<Route>
  <Route path={config.ADMIN_ROUTES.HOME} getComponent={App}>
    <IndexRedirect to={config.ADMIN_ROUTES.DAILY}/>
    <Route path={config.ADMIN_ROUTES.DAILY} getComponent={Daily}/>
    <Route path={config.ADMIN_ROUTES.DAILY+".html"} getComponent={Daily}/>
  </Route>
  </Route>);
