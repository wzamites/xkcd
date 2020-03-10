const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fetch = require('node-fetch');
const port = 8080

const randIntGen = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))

app.get('/api', (req, res) => {
  const maxNum = 2500
  const minNum = 1
  const randomNumber = randIntGen(minNum, maxNum)
  const url = "https://xkcd.com/" + randomNumber + "/info.0.json"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      res.send(JSON.stringify(data.img))
    })
    .catch(data => JSON.stringify("https://xkcd.com/1/info.0.json"))
})

app.listen(port, () => console.log("Server started on port " + port))
