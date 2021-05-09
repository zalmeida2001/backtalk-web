import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Messages from './pages/Messages'
import NotFound from './pages/404'
import Register from './pages/Register'

class App extends Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/messages" component={Messages}/>
        <Route exact path="/404" component={NotFound}/>
        <Route exact path="/register" component={Register}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>
  }
}

export default App;