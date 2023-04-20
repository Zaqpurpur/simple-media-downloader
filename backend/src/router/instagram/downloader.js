const express = require("express");
const instagramGetUrl = require("instagram-url-direct")

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'instagram downloader api'
  })
})

router.post('/download', async (req, res) => {
  const { url } = req.body
  
  try {
    const posts = await instagramGetUrl(url)
    res.status(200).send({
      status: 'success',
      url: posts.url_list,
      posts_number: posts.results_number
    })
  } catch(e) {
    res.send({
      status: 'fail',
      message: e
    })
  }
  
})

module.exports = router
