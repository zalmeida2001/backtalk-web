import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Modal, Button, Alert } from 'react-bootstrap'
import UseChat from "../components/UseChat"
import '../Styles.css'

const Messages = () => {

  const origin = "http://localhost:3001"
  const [roomId, setRoomId] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [newContact, setNewContact] = useState('')
  const [user, setUser] = useState('')
  const [otherUser, setOtherUser] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [alertVariant, setAlertVariant] = useState('')
  const [blankField, setBlankField] = useState('')
  const [contacts, setContacts] = useState([])
  const { messages, sendMessage } = UseChat(roomId)
  document.title = "Mensagens | BackTalk"

  Axios.defaults.withCredentials = true

  useEffect(() => {
    Axios.get(`${origin}/auth`).then((response) => {
      if (response.data.loggedIn === true)
        setUser(response.data.user[0].username)
    })
  }, [])

  useEffect(() => {
    Axios.post(`${origin}/retrievecontacts`, {
      username: user,
    }).then((response) => {
      setContacts(response.data)
    })
  })

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
    Axios.post(`${origin}/dupe`, {
      username: newContact
    }).then((response) => {
      if (response.data.exists !== true) {
        setAlertVariant("danger")
        setBlankField("Utilizador não existe.")
      } else if (user === newContact) {
        setAlertVariant("danger")
        setBlankField("Não pode adicionar o seu contacto.")
      } else {
        Axios.post(`${origin}/checkmirroredcontacts`, {
          username: user,
          contact: newContact,
        }).then((response) => {
          Axios.post(`${origin}/addcontact`, {
            username: user,
            contact: newContact,
            conversation: response.data
          })
          setModalOpen(false)
        })
      }
    })
  }

  const onContactClick = (contact, conversation) => {
    setOtherUser(contact)
    setRoomId(conversation)
    setIsDisabled(false)
    if (contact !== otherUser)
      while (document.getElementById("messages-clear") !== null)
        document.getElementById("messages-clear").remove()
  }

  return (
    <div>
      <div className="container">
        <div className="row" style={{ height: '90vh' }}>
          <div className="col-md-3 messages-margin-top">
            <div className="card bg-default h-100 d-flex flex-column shadow-lg">
              <h5 className="card-header">
                {user}
              </h5>
              <div className="overflow-auto flex-grow-1">
                {contacts.map(contact =>
                  <div className="card-body border-bottom" style={{ cursor: 'pointer' }} key={contact.conversation} onClick={() => { onContactClick(contact.contact, contact.conversation) }}>
                    <p className="card-text unselectable">
                      {contact.contact}
                    </p>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <button className="btn btn-primary rounded" type="button" onClick={() => setModalOpen(true)}>
                  Adicionar
                </button>
                <button className="btn btn-danger rounded float-right px-3" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-9 messages-margin-top">
            <div className="h-100 mr-1 d-flex flex-column shadow-lg">
              <h5 className="card-header border">
                {otherUser}
              </h5>
              <div className="card-body h-100 d-flex flex-column align-items-start justify-content-end px-3 border-right border-left">
                {messages.map((message, i) => {
                  return (
                    <div
                      id="messages-clear"
                      key={i}
                      className={`my-1 d-flex flex-column ${message.ownedByCurrentUser ? 'align-self-end align-items-end' : 'align-items-start'}`}
                    >
                      <div key={i} className={`rounded px-2 py-2 text-wrap message-item ${message.ownedByCurrentUser ? "bg-primary text-white" : "bg-secondary text-white"}`}>
                        {message.body}
                      </div>
                      <div className={`text-muted small ${message.ownedByCurrentUser ? 'text-right' : ''}`}>
                        {message.ownedByCurrentUser ? 'Eu' : otherUser}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="card-footer border input-group">
                <input
                  disabled={isDisabled}
                  className="rounded form-control mr-4"
                  value={newMessage}
                  onChange={handleNewMessageChange}
                  onKeyPress={handleKeyPress}
                  autoFocus={true}
                  placeholder="Nova mensagem..."
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