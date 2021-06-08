import React from "react"
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={(props) => {
      if (true) { // When true, Auth = Successful / When false, Auth = Failed
        return <Component />
      } else {
        return <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      }
    }} />
  )

}

export default ProtectedRoute