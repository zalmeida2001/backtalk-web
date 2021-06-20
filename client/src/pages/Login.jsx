import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Axios from 'axios'
import { Button, Alert, Form } from 'react-bootstrap'
import "../Styles.css"


const Login = () => {

  const [userLog, setUserLog] = useState('')
  const [passwordLog, setPasswordLog] = useState('')
  const [alertVariant, setAlertVariant] = useState('')
  const [blankField, setBlankField] = useState('')
  const [loginStatus, setLoginStatus] = useState("Login | BackTalk")
  document.title = loginStatus

  Axios.defaults.withCredentials = true
  useEffect(() => {
    Axios.get("http://localhost:3001/auth").then((response) => {
      if (response.data.loggedIn === true) {
        window.location = '/messages'
      }
    })
  })

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: userLog,
      password: passwordLog,
    }).then((response) => {
      if (response.data.failed) {
        setAlertVariant("danger")
        setBlankField(response.data.failed)
      }
      setLoginStatus('')
    })
  }

  const selectClick = (e) => {
    e.target.select()
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossOrigin="anonymous"></script>
      </head>
      <body className="bg-light">
        <div id="layoutAuthentication">
          <div id="layoutAuthentication_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                      <div className="card-body">
                        <form>
                          <div className="form-floating mb-3">
                            <Form.Group className="mt-3">
                              <Form.Control className="form-control"
                                placeholder="Nome de Utilizador"
                                type="text"
                                onClick={selectClick}
                                onChange={(e) => { (setUserLog(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div className="form-floating mb-3">
                            <Form.Group className="mt-3 mb-3">
                              <Form.Control className="form-control"
                                placeholder="Password"
                                type="password"
                                onClick={selectClick}
                                onChange={(e) => { (setPasswordLog(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <Button variant="primary" className="mr-3" onClick={login}>Login</Button>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center py-3">
                        <div className="small"><a href="/register">Não tem conta? Crie uma aqui!</a></div>
                      </div>
                    </div>
                    <Alert variant={alertVariant} className="mt-3">
                      {blankField}
                    </Alert>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; BackTalk 2021</div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script src="js/scripts.js"></script>
      </body>
    </html >
  )

}

export default withRouter(Login)