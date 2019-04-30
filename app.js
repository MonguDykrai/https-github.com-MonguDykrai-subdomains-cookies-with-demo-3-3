const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }

  jwt.sign({ user }, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
    if (err) return

    res.json({
      token
    })
  })
})

app.listen(3000, function () {
  console.log('服务正在3000端口运行')
})