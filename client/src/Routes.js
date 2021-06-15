import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'

import Login from './pages/Login'
import Messages from './pages/Messages'
import NotFound from './pages/404'
import Register from './pages/Register'
import Chat from "./pages/Chat"

const Routes = () => {

  return <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/messages/:roomId" component={Chat} />
      <ProtectedRoute path="/messages" component={Messages} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Route exact path="/404" component={NotFound} />
      <Redirect exact from="/" to="/login" />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter >
}

export default Routes