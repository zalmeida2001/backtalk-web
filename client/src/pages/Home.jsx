import React from 'react'
import { Link } from 'react-router-dom'

function Home() {

  document.title = "Home"

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/messages">Messages</Link>
          </li>
        </ul>
      </nav>
    </div>
  )

}

export default Home