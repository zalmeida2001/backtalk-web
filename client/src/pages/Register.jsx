import React, { useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'

const Register = () => {

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [passwordConfReg, setPasswordConfReg] = useState('')
  document.title = "Register"

  const register = () => {
    if (passwordReg !== passwordConfReg) {
      alert("Passwords don't match!")
    } else {
      Axios.post('http://localhost:3001/register', {
        username: usernameReg,
        password: passwordReg,
        passwordConf: passwordConfReg
      })
    }
  }

  return (

    <Container>
      <Form>
        <Form.Group className="mt-3">
          <Form.Control
            placeholder="Username"
            name="txtUsername"
            type="text"
            onChange={(e) => { (setUsernameReg(e.target.value)) }}
          />
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
          <Form.Control
            placeholder="Password"
            name="txtPassword"
            type="password"
            onChange={(e) => { (setPasswordReg(e.target.value)) }}
          />
        </Form.Group>
        <Form.Group className="mt-3 mb-3">
          <Form.Control
            placeholder="Confirm Password"
            name="txtPasswordConf"
            type="password"
            onChange={(e) => { (setPasswordConfReg(e.target.value)) }}
          />
        </Form.Group>
        <Button className="mr-3" onClick={register}>Register</Button>
        <Link to={"/login"}>
          <Button className="mr-3" variant="secondary">Return to Login</Button>
        </Link>
      </Form>
    </Container>

  )

}

export default Register