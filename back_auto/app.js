"use strict";

var express = require('express');

var fs = require('fs'); 

var Client = require('node-rest-client').Client;
var client = new Client();

var app = express();
var port = process.env.PORT || 3001;


function prepare(){

	var data = fs.readFileSync("./config.json", 'utf8');
	var todayswapi = new Date();
	var dateAfterswapi = new Date(JSON.parse(data).date_chargement_data);
	// ajout de 1 jours (le chargement ne se fait qu'une fois par jours)		
	dateAfterswapi.setDate(dateAfterswapi.getDate() + 1);

	// preparation des datas swapi
	// verification si la date maintenant est supérieur a la derniere date de passage
	if(todayswapi.getTime() > dateAfterswapi.getTime()){
		// Insertion de la nouvelle date dans le fichier de config
		writeAndCall(todayswapi, "http://127.0.0.1:3000/dataToLocal");
	}
	

	
	var todaygoogleappi = new Date();
	var dateAftersgoogleapi = new Date(JSON.parse(data).date_chargement_data_googleapi);
	// ajout de 1 jours (le chargement ne se fait qu'une fois par jours)		
	dateAftersgoogleapi.setDate(dateAftersgoogleapi.getDate() + 1);

	// preparation des datas googleapi
	// verification si la date maintenant est supérieur a la derniere date de passage
	if(todaygoogleappi.getTime() > dateAftersgoogleapi.getTime()){
		// Insertion de la nouvelle date dans le fichier de config
		writeAndCall(todaygoogleappi, "http://127.0.0.1:3000/imgToLocal");
	}

	setTimeout(prepare,10000); /* rappel après 10 secondes */	
}

prepare();





function writeAndCall(today, url){
	fs.writeFile("./config.json", JSON.stringify({
		"date_chargement_data": today
	}), function(err) {
		var arg = {
			headers: 
			{
				"Content-Type": "application/json"
			},
			data:
			{
			   "key": "key123!"
			}
		};
		//preparation des nouvelles données vers le fichier local
		client.post(url, arg, function(data, response) {
		});
	});
}

app.listen(port);
console.log('SERVICE - Listening on port ' + port + '...');




