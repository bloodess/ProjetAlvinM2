"use strict";

//var Client = require('node-rest-client').Client;
//var client = new Client();

//var hostswapi = "https://swapi.co/api";
var data = require('./data.json');

exports.games = function(req, res) {
	res.json(data);
}


/*
	var arg = {
	 	headers: 
		{ 
			"Content-Type": "application/json"
	 	}
    };

    client.get(hostswapi+"/people/", arg, function(data, response) {
		res.json(data);
	}).on('error', function(error) {
		res.json({Title: false});
	});
*/