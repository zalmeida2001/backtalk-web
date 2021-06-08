import { Link } from 'react-router-dom'

function NotFound() {

  document.title = "Not Found"

  return (
    <Link to="/">Return to Home</Link>
  )

}

export default NotFound