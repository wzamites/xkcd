const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const fetch = require('node-fetch');
const app = express()
const port = process.env.PORT || 8080

const randIntGen = (max, min) => Math.floor(Math.random() * (max - min + 1) + min)

class Server {
  constructor() {
    this.initExpressMiddleware()
    this.initRoutes()
    this.start()
  }

  initExpressMiddleware() {
    app.use(bodyParser.urlencoded({extended: true}))
  }

  initRoutes() {
    app.get('/api',
      (req, res) => {
        const randomNumber = randIntGen(2278, 1)
        const url = "https://xkcd.com/" + randomNumber + "/info.0.json"
        fetch(url)
          .then(response => response.json())
          .then(data => {
            res.send(JSON.stringify(data.img))
          })
          .catch(data => JSON.stringify("https://xkcd.com/1/info.0.json"))
        })
    app.get('/index.js', (req, res) => res.sendFile(__dirname + "/static/index.js"))
    app.get('/index.css', (req, res) => res.sendFile(__dirname + "/static/index.css"))
    app.get('/', (req, res) => res.sendFile(__dirname + "/static/index.html"))
  }

    start() {
      app.listen(port, () => console.log("Server started on port " + port))
    }
}

new Server()
