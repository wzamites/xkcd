const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const port = 8080

function randIntGen(min, max) {
  return Math.floor(Math.random() * (max)) + min
}

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))

app.get('/api', (req, res) => {
  https.get("https://xkcd.com/info.0.json", (response) => {
    response.on('data', (data) => {
      const currentComicData = JSON.parse(data)
      const maxNum = currentComicData.num
      const minNum = 1
      const randomNumber = randIntGen(minNum, maxNum)
      //715 is a bad call for some reason

      const url = "https://xkcd.com/" + randomNumber + "/info.0.json"
      console.log(url);

      https.get(url, (response) => {
        response.on('data', (data) => {
          const comicData = JSON.parse(data)
          let img = comicData.img
          img = JSON.stringify(img)
          res.send(img)
        })
      })
    })
  })
})

app.listen(port, () => console.log("Server started on port " + port))
