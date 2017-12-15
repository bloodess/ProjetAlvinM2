'use strict';

const fs = require('fs');
const http = require('http')
var Client = require('node-rest-client').Client;
var client = new Client();
var searchType = 'image';
var safe = 'off';
var key = 'AIzaSyAfI9vDrYuRzNVHfXdxjc58dW6tInLiyNk' // Key de l'api
var cx = '013773035180240197132:wb9fxn31moc'; // "adresse" du moteur de recherche

var url = 'http://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q=Luke'; // mettre le nom du personnage après le &q=


var jsonContent = JSON.parse(fs.readFileSync("./module/data/dataPeopleswapi.json"));

var data_mapped = jsonContent.map(function (elem){return {name:elem.name, url_img:elem.url_images}});
console.log("data : " +data_mapped);

exports.images = http.get(url, (res) => {
    
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
  
    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      res.resume();
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        res.JSON.parse(rawData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });




    
 