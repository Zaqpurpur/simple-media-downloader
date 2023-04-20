const express = require("express");
const cors = require("cors");
const youtube = require("./router/youtube/downloader.js");
const instagram = require("./router/instagram/downloader.js");


const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.use('/api/youtube-downloader', youtube)
app.use('/api/instagram-downloader', instagram)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'simple media downloader api'
  })
})

app.get("*", (req, res) => {
  res.status(400).json({
    message: 'cannot find page'
  })
})

app.listen(port, () => console.log('server start at port http://localhost:' + port))
