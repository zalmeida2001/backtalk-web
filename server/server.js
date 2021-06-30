const express = require('express')
const app = express()
const socket = require('socket.io')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const origin = "http://localhost:3000"
const PORT = 3001

app.use(express.json())
app.use(cors({
  origin: [origin],
  methods: ["GET", "POST"],
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  key: "userId",
  secret: "temporarySecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    sameSite: true,
    expires: 60 * 60 * 24 * 1000
  }
}))

const db = mysql.createConnection({
  /*
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11421942',
  password: 'tEp7k99beM',
  database: 'sql11421942'
  */
  host: 'localhost',
  user: 'root',
  database: 'backtalk'
})
db.connect((err) => {
  if (err) throw err
  console.log("MySql Connected.")
})

app.get('/auth', (req, res) => {
  req.session.user ? res.send({ loggedIn: true, user: req.session.user }) : res.send({ loggedIn: false })
})

app.post('/dupe', (req, res) => {
  const { username } = req.body
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result) => {
    result.length > 0 ? res.send({ exists: true }) : res.send({ exists: false })
  })
})

app.post('/retrievecontacts', (req, res) => {
  const { username } = req.body
  db.query("SELECT contact, conversation FROM contacts WHERE username = ?;", username, (err, result) => {
    res.send(result)
  })
})

app.post('/checkmirroredcontacts', (req, res) => {
  const { username, contact } = req.body
  db.query("SELECT conversation FROM contacts WHERE username = ? and contact = ?;", [contact, username], (err, result) => {
    result.length > 0 ? res.send(result[0].conversation) : res.send(uuidv4())
  })
})

app.post('/addcontact', (req, res) => {
  const { username, contact, conversation } = req.body
  db.query("INSERT INTO contacts (username, contact, conversation) VALUES (?, ?, ?);", [username, contact, conversation])
})

app.post('/register', (req, res) => {
  const { username, password } = req.body
  bcrypt.hash(password, 10, (err, hash) => {
    db.query("INSERT INTO users (username, password) VALUES (?, ?);", [username, hash], (err, result) => {
      if (err == null) {
        res.send({ message: "Registered" })
        console.log("Inserted into the database!")
      }
    })
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result) => {
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result
          console.log(req.session.user)
          res.send(result)
        } else {
          res.send({ failed: "Nome de utilizador ou password incorretos." })
        }
      })
    } else {
      res.send({ failed: "Utilizador não existe." })
    }
  })
})

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//-----------------------------------------------------------

const io = socket(server, {
  cors: {
    origin: origin,
  }
})

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"

io.on("connection", (socket) => {

  // Join a conversation
  const { roomId } = socket.handshake.query
  socket.join(roomId)

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
  })

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId)
  })
})