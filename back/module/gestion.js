"use strict";

var Client = require('node-rest-client').Client;
var client = new Client();
 

exports.getPersonnage = function(req, res) {

	res.json({success: true});

}