import React from "react"
import { Link } from 'react-router-dom'

const NotFound = () => {

  document.title = "Not Found"

  return (
    <Link to="/">Return to Home</Link>
  )

}

export default NotFound