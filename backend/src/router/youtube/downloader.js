const express = require("express");
const ytdl = require("ytdl-core");

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'youtube downloader api'
  })
})

router.post('/download', async (req, res) => {
  const { url, type } = req.body
  
  try {
    const info = await ytdl.getInfo(url)
    const detail = info.videoDetails

    let formats;
    if(type === "video") {
      formats = ytdl.filterFormats(info.formats, 'videoandaudio')
    }
    else if(type === "audio") {
      formats = ytdl.filterFormats(info.formats, 'audioonly')
    }
    
    let format = ytdl.chooseFormat(formats, {quality: 'highestaudio'});
    
    res.status(200).send({
      status: 'success',
      url: format.url,
      info: {
        title: detail.title,
        description: detail.description,
        viewCount: detail.viewCount,
        category: detail.category,
        uploadDate: detail.uploadDate,
        ownerChannelName: detail.ownerChannelName,
        thumbnails: detail.thumbnails
      }
    })
  } catch(e) {
    res.send({
      status: 'fail',
      message: e
    })
  }
  
})

module.exports = router
