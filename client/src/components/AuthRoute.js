import React from "react"
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

const AuthRoute = ({ component: Component, ...rest }) => {

  const cookies = new Cookies()

  return (
    <Route {...rest} render={(props) => {
      if (!cookies.get('userId')) { // When true, Auth = Successful / When false, Auth = Failed
        return <Component />
      } else {
        return <Redirect to={{
          pathname: '/messages',
          state: { from: props.location }
        }} />
      }
    }} />
  )

}

export default AuthRoute