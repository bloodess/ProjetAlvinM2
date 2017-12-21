'use strict';
/*
const fs = require('fs');
const http = require('http')*/
var Client = require('node-rest-client').Client;
var client = new Client();
var searchType = 'image';
var safe = 'off';
var key = 'AIzaSyDEl6V6ntchSvqJZSYztzBKqgMlHmzIOs0' // Key de l'api
//var cx = '013773035180240197132:wb9fxn31moc'; // "adresse" du moteur de recherche

var cx = '010200782044674069248:3l_cxdk7hlu';

var url = 'http://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q=Luke'; // mettre le nom du personnage après le &q=



exports.addImage = function(req, res){
  var array = req;
  var arg = {
    headers: 
    { 
      "Content-Type": "application/json"
    }
  };
  var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+array[0].name; // mettre le nom du personnage après le &q=
  console.log(urlbyName);

  client.get(urlbyName, arg, function(data, response) {
    if(data !== undefined){
      //console.log(data);
      // todo test si la recup des data src fctnne
    
      //console.log(data.items[0].pagemap.cse_image[0].src);
      //var t = data.items[0].pagemap.cse_image[0].src;
      res(true);
    }
  }).on('error', function(error) {
      logger.wlog({type: "ERROR", message: "Problème appelle google api."});
      res(false);
  });

  /*array.forEach(element => {
    var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+element.name; // mettre le nom du personnage après le &q=
    
    client.get(urlbyName, arg, function(data, response) {
      if(data !== undefined){
        // todo test si la recup des data src fctnne
        var t = data.items[0].pagemap.cse_image[0].src;
      }
    }).on('error', function(error) {
        logger.wlog({type: "ERROR", message: "Problème appelle google api."});
        res(false);
    });
  });*/

  
 
}



/*

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

  */
  


    
 