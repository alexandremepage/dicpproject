const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function(req, res) {
    res.send("hello world");
})

app.post('/api/', function(req, res) {

    console.log("req body",req.body);
    res.statut(200).send({"message":"data received"});
})

app.listen(PORT, function( ){
    console.log("serveur runing in", PORT);
})