"use strict";

var Client = require('node-rest-client').Client;
var client = new Client();

var hostswapi = "https://swapi.co/api";

exports.getPersonnage = function(req, res) {


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

}