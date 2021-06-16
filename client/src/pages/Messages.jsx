import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

const Messages = () => {

  const [User, setUser] = useState("Not logged in")
  document.title = User

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

  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value)
  }

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/messages/${roomName}`} className="enter-room-button">
        Join room
      </Link>
      <Container>
        <Button className="mr-3" variant="danger" onClick={logout}>Logout</Button>
      </Container>
    </div>
  )
}

export default withRouter(Messages)