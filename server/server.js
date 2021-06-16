const express = require('express')
const app = express()
const socket = require('socket.io')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')
const PORT = 3001

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
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
  host: 'localhost',
  user: 'root',
  database: 'backtalk'
})
db.connect((err) => {
  if (err) throw err
  console.log("MySql Connected.")
})

app.get('/auth', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

app.post('/register', (req, res) => {
  const { username, password, passwordConf } = req.body
  if (password == passwordConf) {
    bcrypt.hash(password, 10, (err, hash) => {
      db.query("INSERT INTO users (username, password) VALUES (?, ?);", [username, hash], (err, result) => {
        if (err == null)
          console.log("Inserted into the database!")
      })
    })
  }
})

app.post('/login', (req, res) => {
  const { username, password } = req.body
  db.query("SELECT * FROM users WHERE username = ?;", username, (err, result) => {
    if (err) res.send({ err: err })
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result
          console.log(req.session.user)
          res.send(result)
        } else {
          res.send({ failed: "Wrong username/password combination!" })
        }
      })
    } else {
      res.send({ failed: "User doesn't exist." })
    }
  })
})

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

//----------------------------------------------------------

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  }
})

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`)

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId)

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  })

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  })
})