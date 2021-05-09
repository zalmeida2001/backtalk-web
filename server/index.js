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
const saltRounds = 10

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
  secret: "longsecret",
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
  res.redirect('/login')
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

const server = app.listen('3001', () => {
  console.log("Server running on port 3001.")
})

/*
io = socket(server)

io.on("connection", (socket) => {

  console.log(socket.id)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data)
  })

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data.content)
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  })

})
*/