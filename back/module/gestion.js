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
