import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import "../styles/Styles.css"


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
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/auth").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username)
      }
    })
  })

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
                      <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                      <div class="card-body">
                        <form>
                          <div class="form-floating mb-3">
                            <Form.Group className="mt-3">
                              <Form.Control class="form-control"
                                placeholder="Nome de Utilizador"
                                type="text"
                                onChange={(e) => { (setUserLog(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div class="form-floating mb-3">
                            <Form.Group className="mt-3 mb-3">
                              <Form.Control class="form-control"
                                placeholder="Password"
                                type="password"
                                onChange={(e) => { (setPasswordLog(e.target.value)) }}
                              />
                            </Form.Group>
                          </div>
                          <div class="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <Button variant="primary" className="mr-3" onClick={login}>Login</Button>
                          </div>
                        </form>
                      </div>
                      <div class="card-footer text-center py-3">
                        <div class="small"><a href="/register">Não tem conta? Crie uma aqui!</a></div>
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
           <Link to={"/messages"}>
             <Button className="mr-3" variant="danger">Messages</Button>
           </Link>
         </Form>
       </Container>
     </Container>
     */
  )

}

export default withRouter(Login)