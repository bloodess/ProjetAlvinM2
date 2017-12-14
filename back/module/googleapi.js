"use strict";

var Client = require('node-rest-client').Client;
var client = new Client();
var searchType = 'image';
var safe = 'off';

var url = 'https://www.googleapis.com/customsearch/v1?q=';

// GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures