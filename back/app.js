"use strict";

var express = require('express');
var bodyParser  = require('body-parser');
var	gestion = require('./module/gestion');

var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, token, Accept");
  next();
});


//N'autorise que le GET et le POST dans le header HTML
app.options('/api/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, POST");
    response.send();
});


// todo mettre en place test
// ecrire un read me
// finir api google probleme sur le cx

app.get('/peoples', gestion.peoples);
app.post('/films', gestion.films);
app.post('/dataToLocal', gestion.dataToLocal);
app.post('/imgToLocal', gestion.imgToLocal);

app.listen(port);
console.log('SERVICE - Listening on port ' + port + '...');




