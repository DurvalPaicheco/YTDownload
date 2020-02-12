const express = require("express");
const app = express();

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/html/index.html");
});

app.listen(4040,function(){
    console.log("Servidor Rodando...");
});