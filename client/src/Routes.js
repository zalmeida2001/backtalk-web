import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Messages from './pages/Messages'
import NotFound from './pages/404'
import Register from './pages/Register'
import Chat from "./pages/Chat"

const Routes = () => {

  return <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/messages" component={Messages} />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/messages/:roomId" component={Chat} />
      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter >
}

export default Routes