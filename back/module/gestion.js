"use strict";

var data = require('./data.json');

exports.peoples = function(req, res) {
	res.json(data);
}