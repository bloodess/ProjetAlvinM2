"use strict";

var fs = require('fs'); 
var	swapi = require('./swapi');
var	googleapi = require('./googleapi');


exports.peoples = function(req, res) {
	swapi.getPeoplesData(function(data){
		res.json(data);
	});
}


exports.films = function(req, res){
	swapi.films(req.body, function(data){
		res.json(data);
	});
}


exports.dataToLocal = function(req, res){
	if(req.body.key == "key123!"){
		swapi.prepareDataToLocal(function(reponse){
			res(true);
		});
	}
}

exports.imgFilmToLocal = function(req, res){
	if(req.body.key = "key123!"){
		fs.readFile("./module/data/dataFilmsswapi.json", function(err, data){
			console.log('DATA : '+data);
			googleapi.addImageFilm(data, function(retour){
				res.json(retour);
			});	
		});
	}
}

exports.imgToLocal = function(req, res){
	if(req.body.key == "key123!"){
		swapi.getPeoplesData(function(data){
			googleapi.addImage(data, function(retour){
				res.json(retour);
			});
		});
	}
}