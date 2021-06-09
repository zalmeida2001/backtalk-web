import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'

const Login = () => {

  const [userLog, setUserLog] = useState('')
  const [passwordLog, setPasswordLog] = useState('')
  const [loginStatus, setLoginStatus] = useState("Login")
  document.title = loginStatus

  Axios.defaults.withCredentials = true

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: userLog,
      password: passwordLog,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].username)
      }
    })
    //<Redirect to={profile}/>
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/auth").then((response) => {
      if (response.data.loggedIn === true)
        setLoginStatus(response.data.user[0].username)
    })
  })

  return (
    <Container>
      <Form>
        <Form.Group className="mt-3">
          <Form.Control
            placeholder="Username"
            type="text"
            onChange={(e) => { (setUserLog(e.target.value)) }}
          />
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
          <Form.Control
            placeholder="Password"
            type="password"
            onChange={(e) => { (setPasswordLog(e.target.value)) }}
          />
        </Form.Group>
        <Button className="mr-3" onClick={login}>Login</Button>
        <Link to={"/register"}>
          <Button className="mr-3" variant="secondary">Register</Button>
        </Link>
      </Form>
    </Container>
  )

}

export default Login