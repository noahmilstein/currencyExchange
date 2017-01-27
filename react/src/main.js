import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Nav from './pages/Nav'
import HomeIndex from './pages/HomeIndex'
import About from './pages/About'

$(function() {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={Nav}>
        <IndexRoute component={HomeIndex}/>
        <Route path='about' component={About}/>
      </Route>
    </Router>,
    document.getElementById('app')
  )
})

// $(document).ready(function() {
//   $('.erb').hide();
// })
