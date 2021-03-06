const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
const ytdl = require('ytdl-core');
const { promisify } = require('util');

const getInfoVideo = promisify(ytdl.getInfo);

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'videos')))

app.use(express.static(__dirname + '/css'));
app.get('/', (req, res ) => res.sendFile(path.join(__dirname + '/views/index.html')))




app.post('/download', async (req , res) =>{
    try{
        const info = await getInfoVideo(req.body.url.replace('https://www.youtube.com/watch?v=', ''));
        ytdl(req.body.url)
        .pipe(fs.createWriteStream(`videos/${info.title}.mp3`))
        .on('finish', () => res.status(200).json({video: `${info.title}.mp3`}))

    }catch(err){
        res.status(500).json(err);
    }
    
})

const port = process.env.PORT || 8080
app.listen(port)