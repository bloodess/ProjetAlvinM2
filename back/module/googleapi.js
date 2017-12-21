'use strict';

var Client = require('node-rest-client').Client;
var client = new Client();
var searchType = 'image';
var safe = 'off';
var key = 'AIzaSyDEl6V6ntchSvqJZSYztzBKqgMlHmzIOs0' // Key de l'api
var cx = '013773035180240197132:wb9fxn31moc'; // "adresse" du moteur de recherche

var cx = '010200782044674069248:3l_cxdk7hlu';

var url = 'http://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType='+searchType+'&q=Luke';


exports.addImage = function(req, res){
  var array = req;
  var arg = {
    headers: 
    { 
      "Content-Type": "application/json"
    }
  };
  var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType='+searchType+'&q='+array[0].name;
  console.log(urlbyName);


  array.forEach(element => {
    var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+element.name;
    
    client.get(urlbyName, arg, function(data, response) {
      if(data !== undefined){
        // todo test si la recup des data src fctnne
        var t = data.items[0].pagemap.cse_image[0].src;
      }
    }).on('error', function(error) {
        logger.wlog({type: "ERROR", message: "Problème appelle google api."});
        res(false);
    });
  });
}

exports.addImageFilm = function(req, res){

  var arrayFilm = req;
  var arg = {
    headers:
    {
      "Content-Type": "application/json"
    }
  };
  var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType='+searchType+'&q='+arrayFilm[0].name;
  console.log(urlbyName);

  array.forEach(element => {
    var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q='+element.name;
    
    client.get(urlbyName, arg, function(data, response) {
      if(data !== undefined){
        // todo test si la recup des data src fctnne
        var t = data.items[0].pagemap.cse_image[0].src;
      }
    }).on('error', function(error) {
        logger.wlog({type: "ERROR", message: "Problème appelle google api."});
        res(false);
    });
  });
}

  


    
 
