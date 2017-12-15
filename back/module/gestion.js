"use strict";

var fs = require('fs'); 
var	swapi = require('./swapi');
var	googleapi = require('./googleapi');


exports.peoples = function(req, res) {
	swapi.prepareDataToLocal();

	swapi.getPeoplesData(function(data){
		res.json(data);
	});
}


exports.films = function(req, res){
	swapi.films(req.body, function(data){
		res.json(data);
	});
}


/**
 * Code de chargement des données en local fait une fois par jours
 */ 
while(true){
	// ont execute la fonction toutes les 10 sec
	//setTimeout(function(){
		// lecture de la derniere date dans le fichier de config
		var data = fs.readFileSync("./module/data/config.json", 'utf8');
		
		var todayswapi = new Date();
		var dateAfterswapi = new Date(JSON.parse(data).date_chargement_data);
		// ajout de 1 jours (le chargement ne se fait qu'une fois par jours)		
		dateAfter.setDate(dateAfter.getDate() + 1);

		// preparation des datas swapi
		// verification si la date maintenant est supérieur a la derniere date de passage
		if(today.getTime() > dateAfter.getTime()){
			// Insertion de la nouvelle date dans le fichier de config
			fs.writeFile("./module/data/config.json", JSON.stringify({
				"date_chargement_data": today
			}), function(err) {
				//preparation des nuvelle données vers le fichier local
				swapi.prepareDataToLocal();
			});
		}




		
		var todaygoogleappi = new Date();
		var dateAftersgoogleapi = new Date(JSON.parse(data).date_chargement_data_googleapi);
		// ajout de 1 jours (le chargement ne se fait qu'une fois par jours)		
		dateAftersgoogleapi.setDate(dateAftersgoogleapi.getDate() + 1);

		
		// preparation des datas googleapi
		// verification si la date maintenant est supérieur a la derniere date de passage
		if(todaygoogleappi.getTime() > dateAftersgoogleapi.getTime()){
			// Insertion de la nouvelle date dans le fichier de config
			fs.writeFile("./module/data/config.json", JSON.stringify({
				"date_chargement_data_googleapi": todaygoogleappi
			}), function(err) {
				//preparation des nuvelle données vers le fichier local

				//todo chercher fichier local
				// todo appel fct image google api
			});
		}

	//}, 2);
}