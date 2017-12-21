'use strict';


var fs = require('fs');
var Client = require('node-rest-client').Client;
var client = new Client();
var logger = require("./logger");

var searchType = 'image';
var key = 'AIzaSyAVMY-xZOkJiQOSPfc-ECfTbUH4lUKGb14' // Key de l'api

var cx = '013773035180240197132:wb9fxn31moc'; // "adresse" du moteur de recherche


/**
 * Cette fonction ajoute une image trouvé dans google et l'ajoute a chaque people
 * @param {*} req tableau de tous les peoples present dans le fichier en local
 * @param {*} res true
 */
exports.addImage = function(req, res){
  logger.wlog({type: "INFOS", message: "prepare data peoples image : "});
  var peoplesWithImage = [];
  var array = req;
  var nbarray = 0;

  var arg = {
    headers: 
    { 
      "Content-Type": "application/json"
    }
  };
  
  array.forEach(element => {
    var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType='+searchType+'&q='+element.name+' star wars';
    //console.log('LE BATARD CES : '+ element.name);
    client.get(urlbyName, arg, function(data, response) {
      //console.log('DATA : '+ data);

      nbarray = nbarray + 1;

      if(data.items[0] !== undefined){
        var urlimg = data.items[0].link;
        //console.log('URL IMAGE : '+urlimg);
        peoplesWithImage.push({
          "name": element.name,
          "gender": element.gender,
          "height": element.height,
          "mass": element.mass,
          "url_images": [
            data.items[0].link
          ],
          "films": element.films
        });
        if(nbarray === peoplesWithImage.length){
          fs.writeFileSync("./module/data/dataPeopleswapi.json", JSON.stringify(peoplesWithImage), 'utf8');
        }

      }
    }).on('error', function(error) {
        logger.wlog({type: "ERROR", message: "Problème google api."+ error});
    });
  });

  return true;
}


/**
 * Cette fonction ajoute une image trouvé dans google et l'ajoute a chaque film
 * @param {*} req tableau des films present en local
 * @param {*} res teue
 */
exports.addImageFilm = function(req, res){
  var arrayFilm = req;
  var filmsWithImage = [];
  var nbarray = 0;

  var arg = {
    headers:
    {
      "Content-Type": "application/json"
    }
  };

  arrayFilm.forEach(element => {
   
    var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType='+searchType+'&q='+element.title;
    
    client.get(urlbyName, arg, function(data, response) {
      nbarray = nbarray + 1;
      if(data !== undefined){

        filmsWithImage.push({
          "id": element.id,
          "title": element.title,
          "opening_crawl": element.opening_crawl,
          "episode_id": element.episode_id,
          "release_date": element.release_date,
          "url_image": data.items[0].link
        });

        if(nbarray === filmsWithImage.length){
          fs.writeFileSync("./module/data/dataFilmsswapi.json", JSON.stringify(filmsWithImage), 'utf8');
        }
      }
    }).on('error', function(error) {
        logger.wlog({type: "ERROR", message: "Problème appelle google api."});
    });
  });
  return true;
}

