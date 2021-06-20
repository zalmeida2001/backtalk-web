import React, { useEffect, useState } from "react"
import { withRouter } from "react-router"
import Axios from 'axios'
import UseChat from "../components/UseChat"
import "../styles/Chat.css"

const ChatRoom = (props) => {

  const { roomId } = props.match.params
  const { messages, sendMessage } = UseChat(roomId)
  const [newMessage, setNewMessage] = useState('')
  const [User, setUser] = useState('')
  document.title = User

  Axios.defaults.withCredentials = true
  useEffect(() => {
    Axios.get("http://localhost:3001/auth").then((response) => {
      if (response.data.loggedIn === true) {
        setUser(response.data.user[0].username)
      }
    })
  })

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleSendMessage = () => {
    sendMessage(User + ": " + newMessage)
    setNewMessage("")
  }

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"}`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  )
}

export default withRouter(ChatRoom)
