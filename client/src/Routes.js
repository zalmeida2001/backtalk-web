import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'

import Login from './pages/Login'
import Messages from './pages/Messages'
import Register from './pages/Register'
import Chat from "./pages/Chat"

const Routes = () => {

  return <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/messages/:roomId" component={Chat} />
      <ProtectedRoute path="/messages" component={Messages} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter >
}

export default Routes