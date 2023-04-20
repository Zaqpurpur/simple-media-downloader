const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require("axios");
const instagramGetUrl = require("instagram-url-direct")

const url = "https://youtu.be/TL3OeBhrVN0"
const urlInsta = "https://www.instagram.com/p/CpC8y61p3Hb/"
const urlDanboru = "https://danbooru.donmai.us/posts?tags=scenery+&z=5"

async function info(url) {
  const info = await ytdl.getInfo(url)
  let audioFormats = ytdl.filterFormats(info.formats, 'videoandaudio')
  let format = ytdl.chooseFormat(audioFormats, {quality: 'highestaudio'});
}

async function getImage(url) {
  const cheerio = require("cheerio");
  const response = await axios.get(url + '?__a=1')
  const $ = cheerio.load(response.data)
  console.log(response.data)
}

//getImage(urlInsta)
const links = async () => { 
  console.log(await instagramGetUrl(urlInsta));
}
links()