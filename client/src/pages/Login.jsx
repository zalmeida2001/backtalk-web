import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Button, Form, Badge } from 'react-bootstrap'

function Login() {

  const [emailLog, setEmailLog] = useState('')
  const [passwordLog, setPasswordLog] = useState('')
  const [loginStatus, setLoginStatus] = useState('')

  Axios.defaults.withCredentials = true

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: emailLog,
      password: passwordLog,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].email)
      }
    })
  }

  const deleteCookie = () => {
    //Deletes login cookie
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true)
        setLoginStatus(response.data.user[0].email)
    })
  })

  return (
    <Container>
      <Form>
        <Form.Group className="mt-3">
          <Form.Control placeholder="Email" type="text" onChange={(e) => { (setEmailLog(e.target.value)) }} />
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
          <Form.Control placeholder="Password" type="password" onChange={(e) => { (setPasswordLog(e.target.value)) }} />
        </Form.Group>
        <Button className="mr-3" onClick={login}>Login</Button>
        <Link to={"/register"}><Button className="mr-3" variant="secondary">Register</Button></Link>
        <Button className="mr-3" onClick={deleteCookie} variant="danger">Log Out</Button>
        <Badge>{loginStatus}</Badge>
      </Form>
    </Container>
  )

}

export default Login