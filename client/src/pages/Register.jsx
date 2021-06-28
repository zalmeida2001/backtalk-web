import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Axios from 'axios'
import { Button, Form, Alert } from 'react-bootstrap'

const Register = () => {

  const [userReg, setuserReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')
  const [passwordConfReg, setPasswordConfReg] = useState('')
  const [alertVariant, setAlertVariant] = useState('')
  const [blankField, setBlankField] = useState('')
  const [regStatus, setRegStatus] = useState("Registar | BackTalk")
  document.title = regStatus
  Axios.defaults.withCredentials = true

  useEffect(() => {
    if (localStorage.getItem('registered')) {
      localStorage.removeItem('registered')
      window.location = '/login'
    }
  })

  const register = () => {
    if (passwordReg !== passwordConfReg) {
      setAlertVariant("danger")
      setBlankField("As passwords não coincidem.")
    } else if (userReg === "" || passwordReg === "" || passwordConfReg === "") {
      setAlertVariant("danger")
      setBlankField("Todos os campos devem ser preenchidos.")
    } else {
      Axios.post('http://localhost:3001/dupe', {
        username: userReg
      }).then((response) => {
        if (response.data.exists === true) {
          setAlertVariant("danger")
          setBlankField("Utilizador já está registado.")
        } else {
          Axios.post('http://localhost:3001/register', {
            username: userReg,
            password: passwordReg,
            passwordConf: passwordConfReg
          }).then(() => {
            localStorage.setItem('registered', true)
            setRegStatus('')
          })
        }
      })
    }
  }

  const selectClick = (e) => {
    e.target.select()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      register()
    }
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
                      <div className="card-header"><h3 className="text-center font-weight-light my-4">Registar</h3></div>
                      <div className="card-body">
                        <form>
                          <div className="form-floating mb-3">
                            <Form.Group className="mt-3">
                              <Form.Control
                                placeholder="Nome de Utilizador"
                                name="txtUsername"
                                type="text"
                                onClick={selectClick}
                                onChange={(e) => { (setuserReg(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div className="form-floating mb-3">
                            <Form.Group className="mt-3 mb-3">
                              <Form.Control
                                placeholder="Password"
                                name="txtPassword"
                                type="password"
                                onClick={selectClick}
                                onChange={(e) => { (setPasswordReg(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div className="form-floating mb-3">
                            <Form.Group className="mt-3 mb-3">
                              <Form.Control
                                placeholder="Confirmar Password"
                                name="txtPasswordConf"
                                type="password"
                                onKeyPress={handleKeyPress}
                                onClick={selectClick}
                                onChange={(e) => { (setPasswordConfReg(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <Button variant="primary" className="mr-3" onClick={register}>Registar</Button>
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center py-3">
                        <div className="small"><a href="/login">Já tem conta? Dê Login aqui!</a></div>
                      </div>
                    </div>
                    <div className="">
                      <Alert variant={alertVariant} className="mt-3">
                        {blankField}
                      </Alert>
                    </div>
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
    </html>
  )

}

export default withRouter(Register)