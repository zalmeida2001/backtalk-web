import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import UseChat from "../components/UseChat"
import '../Styles.css'

const Messages = (props) => {

  const { roomId } = props.match.params
  const { messages, sendMessage } = UseChat(roomId)
  const [newMessage, setNewMessage] = useState('')
  const [User, setUser] = useState('')
  document.title = "Messages | BackTalk"

  Axios.defaults.withCredentials = true
  useEffect(() => {
    Axios.get("http://localhost:3001/auth").then((response) => {
      if (response.data.loggedIn === true)
        setUser(response.data.user[0].username)
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
    sendMessage(User + ": " + newMessage)
    setNewMessage("")
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ height: '100vh' }}>
          <div className="card bg-default h-100 d-flex flex-column">
            <h5 className="card-header">
              BackTalk
            </h5>
            <div className="overflow-auto flex-grow-1">
              <div className="card-body border-bottom">
                <p className="card-text">
                  Card content
                </p>
              </div>
            </div>
            <div className="card-footer">
              <div className="btn-group btn-group-lg" role="group">
                <button className="btn btn-primary rounded" type="button">
                  Adicionar
                </button>
                <button className="btn btn-danger rounded" type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="h-100 d-flex flex-column">
            <div className="h-100 d-flex flex-column align-items-start justify-content-end px-3">
              {messages.map((message, i) => {
                return (
                  <div
                    key={i}
                    className={`my-1 d-flex flex-column ${message.ownedByCurrentUser ? 'align-self-end align-items-end' : 'align-items-start'}`}
                  >
                    <div key={i} className={`rounded px-2 py-1 message-item ${message.ownedByCurrentUser ? "bg-primary text-white" : "bg-secondary text-black"}`}>
                      {message.body}
                    </div>
                    <div className={`text-muted small ${message.ownedByCurrentUser ? 'text-right' : ''}`}>
                      {message.ownedByCurrentUser ? 'You' : 'tempName'}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="input-group">
              <input
                className="rounded form-control"
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Write message..."
              />
              <div className="input-group-append">
                <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Messages)