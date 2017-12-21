'use strict';

var fs = require('fs');
var Client = require('node-rest-client').Client;
var client = new Client();
var searchType = 'image';
var key = 'AIzaSyDEl6V6ntchSvqJZSYztzBKqgMlHmzIOs0' // Key de l'api
var cx = '013773035180240197132:wb9fxn31moc'; // "adresse" du moteur de recherche

var logger = require("./logger");

/**
 * Cette fonction ajoute une image trouver dans google et l'ajoute a chaque people
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
    var urlbyName = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&searchType='+searchType+'&q='+array[0].name; // mettre le nom du personnage après le &q=
    
    client.get(urlbyName, arg, function(data, response) {
      nbarray = nbarray + 1;
      if(data !== undefined){
        var urlimg = data.items[0].link;
        
        peoplesWithImage.push({
          "name": element.name,
          "gender": element.gender,
          "height": element.height,
          "mass": element.mass,
          "url_images": [
            data.items[0].link,
            data.items[1].link
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




