import React, {useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {Container, Button, Form, InputGroup} from 'react-bootstrap'


function Register() {

  const [emailReg, setEmailReg] = useState('')
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [passwordConfReg, setPasswordConfReg] = useState('')
  
  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: emailReg,
      username: usernameReg, 
      password: passwordReg,
      passwordConf: passwordConfReg
    }).then((response) => {
      console.log(response)
    })
  }
  
  return (
    
    <Container>
      <InputGroup className="mt-3">
        <Form.Control placeholder="Username" type="text" onChange={(e) => {(setUsernameReg(e.target.value))}}/>
      </InputGroup>
      <InputGroup className="mt-3 mb-3">
        <Form.Control placeholder="Email" type="text" onChange={(e) => {(setEmailReg(e.target.value))}}/>
      </InputGroup>
      <InputGroup className="mt-3 mb-3">
        <Form.Control placeholder="Password" type="password" onChange={(e) => {(setPasswordReg(e.target.value))}}/>
      </InputGroup>
      <InputGroup className="mt-3 mb-3">
        <Form.Control placeholder="Confirm Password" type="password"onChange={(e) => {(setPasswordConfReg(e.target.value))}}/>
      </InputGroup>
      <Button className="mr-3" onClick={register}>Register</Button>
      <Link to={"/login"}><Button className="mr-3" variant="secondary">Return to Login</Button></Link>
    </Container>

  )

}

export default Register