import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Modal, Button, Alert } from 'react-bootstrap'
import UseChat from "../components/UseChat"
import '../Styles.css'

const Messages = (props) => {

  const { roomId } = props.match.params
  const { messages, sendMessage } = UseChat(roomId)
  const [newMessage, setNewMessage] = useState('')
  const [newContact, setNewContact] = useState('')
  const [User, setUser] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [blankField, setBlankField] = useState('')
  const [contacts, setContacts] = useState([])
  document.title = "Messages | BackTalk"

  Axios.defaults.withCredentials = true

  useEffect(() => {
    Axios.get("http://localhost:3001/auth").then((response) => {
      if (response.data.loggedIn === true)
        setUser(response.data.user[0].username)
      else
        window.location = '/login'
    })
  }, [])

  useEffect(() => {
    Axios.post('http://localhost:3001/retrievecontacts', {
      username: User,
    }).then((response) => {
      setContacts(response.data)
    })
  }, [[], [newContact]])

  const logout = () => {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    window.location = '/login'
  }

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    if (newMessage !== '') {
      sendMessage(newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  function closeModal() {
    setModalOpen(false)
  }

  const handleChangeContact = (event) => {
    setNewContact(event.target.value)
  }

  const handleNewContact = () => {
    Axios.post('http://localhost:3001/dupe', {
      username: newContact
    }).then((response) => {
      if (response.data.exists !== true) {
        setAlertVariant("danger")
        setBlankField("Utilizador não existe.")
      } else {
        Axios.post('http://localhost:3001/addcontact', {
          username: User,
          contact: newContact,
        })
        setModalOpen(false)
      }
    })
  }

  const clickContact = () => {

  }

  return (
    <div>
      <div className="container">
        <div className="row" style={{ height: '90vh' }}>
          <div className="col-md-3 messages-margin-top">
            <div className="card bg-default h-100 d-flex flex-column shadow-lg">
              <h5 className="card-header">
                {User}
              </h5>
              <div className="overflow-auto flex-grow-1">
                {contacts.map(contact =>
                  <div className="card-body border-bottom" style={{ cursor: 'pointer' }} key={contact.conversation} onClick={clickContact(contact.conversation)}>
                    <p className="card-text unselectable">
                      {contact.contact}
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="btn-group btn-group-md" role="group">
                  <button className="btn btn-primary rounded" type="button" onClick={() => setModalOpen(true)}>
                    Adicionar
                  </button>
                  <button className="btn btn-danger rounded" type="button" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 messages-margin-top">
            <div className="h-100 mr-1 d-flex flex-column shadow-lg">
              <h5 className="card-header border">
                otherUser
              </h5>
              <div className="card-body h-100 d-flex flex-column align-items-start justify-content-end px-3 border-right border-left">
                {messages.map((message, i) => {
                  return (
                    <div
                      key={i}
                      className={`my-1 d-flex flex-column ${message.ownedByCurrentUser ? 'align-self-end align-items-end' : 'align-items-start'}`}
                    >
                      <div key={i} className={`rounded px-2 py-2 text-wrap message-item ${message.ownedByCurrentUser ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                        {message.body}
                      </div>
                      <div className={`text-muted small ${message.ownedByCurrentUser ? 'text-right' : ''}`}>
                        {message.ownedByCurrentUser ? 'You' : 'otherUser'}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="card-footer border input-group">
                <input
                  className="rounded form-control mr-4"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  onKeyPress={handleKeyPress}
                  autoFocus={true}
                  placeholder="Write message..."
                />
                <div className="input-group-append">
                  <button onClick={handleSendMessage} className="btn btn-primary rounded px-4">Enviar</button>
                </div>
              </div>
            </div>
            <Modal show={modalOpen} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Novo Contacto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  className="rounded form-control"
                  value={newContact}
                  onChange={handleChangeContact}
                  placeholder="Adicionar contacto"
                />
              </Modal.Body>
              <Modal.Footer>
                <Alert variant={alertVariant}>
                  {blankField}
                </Alert>
                <Button variant="primary" onClick={handleNewContact}>Adicionar</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Messages)