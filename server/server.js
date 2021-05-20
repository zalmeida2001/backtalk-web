const express = require('express')
const app = express()
const socket = require('socket.io')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const customId = require('custom-id')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const saltRounds = 10
const PORT = 3001;

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
    expires: 60 * 60 * 24
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

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

app.post('/register', (req, res) => {
  const suid = customId({})
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const passwordConf = req.body.passwordConf
  if (password == passwordConf) {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      db.query("INSERT INTO users (uniqueuid, email, username, password) VALUES (?, ?, ?, ?);", [suid, email, username, hash], (err, result) => {
        console.log(err)
      })
    })
  }
})

app.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
    if (err) res.send({ err: err })
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result

          console.log(req.session.user)
          res.send(result)
        } else {
          res.send({ message: "Wrong email/password combination!" })
        }
      })
    } else {
      res.send({ message: "User doesn't exist." })
    }
  }
  )
})

app.get('/messages', (req, res) => {
  res.render('Messages')
})

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
  }
})

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});