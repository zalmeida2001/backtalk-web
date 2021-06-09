const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bcrypt = require('bcrypt')
const customId = require('custom-id')
const app = express()
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'backtalk'
})
const PORT = 3001

db.connect((err) => {
  if (err) throw err
  console.log("MySql Connected")
})
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.post('/register', (req, res) => {
  const suid = customId({})
  const { email, username, password, passwordConf } = req.body
  if (password == passwordConf) {
    bcrypt.hash(password, 10, (err, hash) => {
      db.query("INSERT INTO users (uniqueuid, email, username, password) VALUES (?, ?, ?, ?);", [suid, email, username, hash], (err, result) => {
        if (err) {
          res.status(400).json({ error: err })
          res.send(err)
        } else
          res.json("User registered.")
      })
    })
  }
})

app.post('/login', (req, res) => {
  res.json('/login')
})

app.post('/profile', (req, res) => {
  res.json('/profile')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})