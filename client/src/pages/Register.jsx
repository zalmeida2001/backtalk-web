import React, { useState } from 'react'
import { withRouter } from 'react-router'
import Axios from 'axios'
import { Button, Form } from 'react-bootstrap'

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
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Login - SB Admin</title>
        <link href="css/styles.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossorigin="anonymous"></script>
      </head>
      <body class="bg-light">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-5">
                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Registar</h3></div>
                      <div class="card-body">
                        <form>
                          <div class="form-floating mb-3">
                            <Form.Group className="mt-3">
                              <Form.Control
                                placeholder="Nome de Utilizador"
                                name="txtUsername"
                                type="text"
                                onChange={(e) => { (setUsernameReg(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div class="form-floating mb-3">
                            <Form.Group className="mt-3 mb-3">
                              <Form.Control
                                placeholder="Password"
                                name="txtPassword"
                                type="password"
                                onChange={(e) => { (setPasswordReg(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div class="form-floating mb-3">
                            <Form.Group className="mt-3 mb-3">
                              <Form.Control
                                placeholder="Confirmar Password"
                                name="txtPasswordConf"
                                type="password"
                                onChange={(e) => { (setPasswordConfReg(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <Button variant="primary" className="mr-3" onClick={register}>Registar</Button>
                          </div>
                        </form>
                      </div>
                      <div class="card-footer text-center py-3">
                        <div class="small"><a href="/login">Já tem conta? Dê Login aqui!</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div id="layoutAuthentication_footer">
            <footer class="py-4 bg-light mt-auto">
              <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                  <div class="text-muted">Copyright &copy; BackTalk 2021</div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="js/scripts.js"></script>
      </body>
    </html >
    /*
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
    */
  )

}

export default withRouter(Register)