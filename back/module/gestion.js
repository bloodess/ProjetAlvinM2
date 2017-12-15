"use strict";


var	swapi = require('./swapi');


exports.peoples = function(req, res) {
	//swapi.prepareDataToLocal();
	swapi.getPeoplesData(function(data){
		res.json(data);
	});
}


exports.films = function(req, res){
	swapi.films(req.body, function(data){
		res.json(data);
	});
}


//todo ici faire une fonction auto pour le cheragement des datas
/*
while(true){
	// ont execute la fonction toutes les 5 minutes
	setTimeOut(this.prepareData(), 300000);
}*/

exports.prepareData = function(){
	var today = new Date();
	fs.readFile("./module/data/config.json", function(err, data){
		if(today.getTime() > JSON.parse(data).date_chargement_data){
			swapi.prepareDataToLocal();
		}
	});
}