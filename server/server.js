const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
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

                console.log("Send mail");

                sendMail(req.body, info => {
                    console.log("info",info);
                });/*, info => {
                    //console.log('Message Info' ${info?.messageId});
                    res.send(info);
                });*/
            }
        );
    } else {
        console.log("Erreur requête", res.statusCode);
    }
})

async function sendMail(reqBody, callback) {

 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'ab2c4e44f4cbe3', // generated ethereal user
      pass: 'a62ced3b87f64f', // generated ethereal password
    },
  });

  var strDestinaryAddress = '';
  var strSubject = '';
  var strText = '';
  var strHTML = '';
  var fileName = '';
  var path = '';

  var selectQuestion = reqBody.selectQuestion;
  var userEmail = reqBody.userEmail;
  var tahitiNumber = reqBody.tahitiNumber;
  var commentary = reqBody.commentary;
  var fileDeclaration = reqBody.fileDeclaration;

  if (selectQuestion == "justificatif") {
      strDestinaryAddress += 'dicp-justificatif@dicp.pf';
      strSubject += 'Demande DICP - Justificatif';
      strText += 'Bonjour,\r\n';
      strText += 'Demande de justificatif pour le Numéro Tahiti: ';
      strText += tahitiNumber;

      strHTML += '<br>Bonjour</br>';
      strHTML += '<br>Demande de justificatif pour le Numéro Tahiti: </br>';
      strHTML += tahitiNumber;

  } else if (selectQuestion == "contentious") {
    strDestinaryAddress += 'dicp-contentieux@dicp.pf';
    strSubject += 'Demande DICP - Contentieux';
    strText += 'Bonjour,\r\n';
    strText += 'Une demande de contentieux a été effectuée: \r\n';
    strText += '    email: ' + userEmail + '\r\n';
    strText += '    Numéro Tahiti: ' + tahitiNumber + '\r\n';
    strText += '    Remarques: ' + commentary;

    strHTML += '<br>Bonjour,</br>';
    strHTML += '<br>Une demande de contentieux a été effectuée: </br>';
    strHTML += '<br>    email: ' + userEmail + '</br>';
    strHTML += '<br>    Numéro Tahiti: ' + tahitiNumber + '</br>';
    strHTML += '<br>    Remarques: ' + commentary + '</br>';

  } else if (selectQuestion == "declaration") {
    strDestinaryAddress += 'dicp-declaration@dicp.pf';
    strSubject += 'Demande DICP - Déclaration';

    fileName = 'declaration-' + tahitiNumber + '.jpg';
    path = fileDeclaration;

    strText += 'Bonjour,\r\n';
    strText += 'Un fichier de déclaration a été transmis: \r\n';
    strText += '    email: ' + userEmail + '\r\n';
    strText += '    Numéro Tahiti: ' + tahitiNumber + '\r\n';

    strHTML += '<br>Bonjour,</br>';
    strHTML += '<br>Un fichier de déclaration a été transmis: </br>';
    strHTML += '<br>    email: ' + userEmail + '</br>';
    strHTML += '<br>    Numéro Tahiti: ' + tahitiNumber + '</br>';

  } else {
    return console.error("Il n'y a pas de choix de question envoyée par la requête");
  }

  var mailOptions = {
    from: '<support-dicp-question@dicp.pf>',
    to: strDestinaryAddress,
    subject: strSubject,
    text: strText,
    html: strHTML,
    attachments: [
      {
        filename: fileName,
        path: path
      }
    ]
  };

  // send mail with defined transport object
  let info = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info);
  });
  //let info = transporter.sendMail(mailOptions);
  callback(info);
}

app.listen(PORT, function( ){
    console.log("serveur runing in", PORT);
})