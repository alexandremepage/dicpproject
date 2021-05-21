const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
//const events = require('./events');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'timeline',
    password : 'password',
    database : 'timeline'
  });
  
connection.connect();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', function(req, res) {
    res.send("hello world");
})

app.post('/api/', function(req, res) {

    res.status(200).send({"message":"data received"});

    var strStatus = res.statusCode;
    if (strStatus == 200) {
        console.log("Request received");
        var selectquestion = req.body.selectQuestion;
        var useremail = req.body.userEmail;
        var tahitinumber = req.body.tahitiNumber;
        var commentary = req.body.commentary;
        var filedeclaration = req.body.fileDeclaration;
        
        connection.query(
            'INSERT INTO dicpquestion (id, owner, date, selectquestion, useremail, tahitinumber, commentary, filedeclaration) VALUES (?,?,?,?,?,?,?,?)',
            ['1', connection.user, new Date(), selectquestion, useremail, tahitinumber, commentary, filedeclaration], 
            (err,rows) => {
                if(err) throw "Error while inserting datas:", err;
        
                console.log(rows);
                console.log("Database request:",
                'INSERT INTO dicpquestion (id, owner, date, selectquestion, useremail, tahitinumber, commentary, filedeclaration) VALUES (?,?,?,?,?,?,?,?)',
                ' with values [\'1\', ', 
                '\'timeline\',',
                new Date(),',',
                selectquestion,',',
                useremail,',',
                tahitinumber,',',
                commentary,',',
                filedeclaration,']');
            });
    } else {
        console.log("Erreur requête", res.statusCode);
    }
})

app.listen(PORT, function( ){
    console.log("serveur runing in", PORT);
})