import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Nav from './pages/Nav';
import HomeIndex from './pages/HomeIndex';
import About from './pages/About';
import AllRates from './pages/AllRates';
import Welcome from './pages/Welcome';

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={Nav}>
        <IndexRoute component={Welcome}/>
        <Route path='convert' component={HomeIndex}/>
        <Route path='about' component={About}/>
        <Route path='rates' component={AllRates}/>
      </Route>
    </Router>,
    document.getElementById('app')
  )
})

// $(document).ready(function() {
//   $('.erb').hide();
// })
