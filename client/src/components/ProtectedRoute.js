import React from "react"
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ isAuth, component: Component, ...rest }) => {

  return (
    <Route {...rest} render={(props) => {
      if (isAuth) {
        return <Component />
      } else {
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    }} />
  )

}

export default ProtectedRoute