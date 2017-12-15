"use strict";

var fs = require('fs'); 

var Client = require('node-rest-client').Client;
var client = new Client();

var logger = require("./logger");

/**
 * 
 * @param {*} req.filmTOP id du film du haut de la page resultat
 * @param {*} req.filmBot id du film du bas de la page resultat
 * @param {*} res retourne deux films liée au id passer en paramètre
 */
exports.films = function(req, res){
    if(req.hasOwnProperty('filmTop') == false || req.hasOwnProperty('filmBot') == false){
        logger.wlog({type: "ERROR", message: "function film, Le format des données recu par le serveur ne sont pas valide."});
        res({"erreur": "Le format des données recu par le serveur ne sont pas valide."})
    }
    var id = [req.filmTop, req.filmBot];
    fs.readFile("./module/data/dataFilmsswapi.json", function(err, data){
        res(JSON.parse(data).filter(function(req){
            return req.id == id[0] || req.id == id[1];
        }));
    });
}

/**
 * 
 * @param {*} res retourne 10 peoples chercher aléatoirement dans les données local
 */
exports.getPeoplesData = function(res) {
    var peoples = [];
    
    // lecture de tous les peoples dans le fichier json en local
    fs.readFile("./module/data/dataPeopleswapi.json", function(err, datas){
        var data = JSON.parse(datas);
        var nbpeoples = data.length;
        
        if(nbpeoples < 1){
            res({"erreur": "Problème sur le nombre de vos héros."})
        }

        // Ici ont boucle sur 10 car nous voulons renvoyer 10 peoples aléatoire
        for(var i = 0; i < 10; i++){
            // ont tire un chiffre pour selectionner un people dans la liste
            var sel = Math.round(Math.random() * (nbpeoples - 0) + 0);
            var films = [];


            if(data[sel] == undefined || !data[sel].hasOwnProperty('films')){
                res({"erreur": "Probleme de récupération de vos héros."})
            }

            for(var u = 0; u < data[sel].films.length; u++){
                var taillestring = data[sel].films[u].length;
                films.push(parseInt(data[sel].films[u].substring(taillestring-2, taillestring-1)));
            }
        
            peoples.push({
                "name": data[sel].name,
                "gender": data[sel].gender,
                "height": data[sel].height,
                "mass": data[sel].mass,
                "url_images": data[sel].url_images,
                "films" : films
            });
        }
        if(peoples.length === 0) {
            res({"erreur":"Vous n'avez pas de héros disponible."})
        }
        res(peoples);
    });
   
}

/**
 * Cette fonction charge les données de l'api swapi en local.
 */
exports.prepareDataToLocal = function(){
    logger.wlog({type: "INFOS", message: "Prepare data local."});
    this.getAllPeopleSwapi(function(data){
        fs.writeFile("./module/data/dataPeopleswapi.json", JSON.stringify(data), function(err) {
            if(err) {
                logger.wlog({type: "ERROR", message: "prepare data peoples : " + err});
            }
        }); 
    });

    this.getAllFilmsSwapi(function(data){
        fs.writeFile("./module/data/dataFilmsswapi.json", JSON.stringify(data), function(err) {
            if(err) {
                logger.wlog({type: "ERROR", message: "prepare data films : " + err});
            }
        }); 
    });

}

/**
 * 
 * @param {*} res Cette fonction appelle l'api swapi et prepare les données dans un format choisie pour les films
 */
exports.getAllFilmsSwapi = function(res){
    var retour = [];
    this.requestswapi({"urlpatch": "https://swapi.co/api/films/?page=1"}, function(data){
        if(data === false){
            res("Requete non valide!");
        }
        for(var e = 0; e < data.results.length; e++){
            if(data.results[e].hasOwnProperty('url') == false || data.results[e].hasOwnProperty('title') == false ||data.results[e].hasOwnProperty('opening_crawl') == false || data.results[e].hasOwnProperty('episode_id') == false || data.results[e].hasOwnProperty('release_date') == false){
                res("Données non valide!")
            }
            var idep = data.results[e].url.substring(data.results[e].url.length-2, data.results[e].url.length-1);
            retour.push({
                "id": idep,
                "title": data.results[e].title,
                "opening_crawl": data.results[e].opening_crawl,
                "episode_id": data.results[e].episode_id,
                "release_date": data.results[e].release_date,
                "url_image":"https://images-na.ssl-images-amazon.com/images/I/51H4KT8A0FL._SY445_.jpg"
            });
        }
        res(retour);
    });
    
}
/**
 * 
 * @param {*} res Cette fonction appelle l'api swapi et prepare les données dans un format choisie pour les peoples
 */
exports.getAllPeopleSwapi = function(res){
    var retour = [];
    
    for(var i = 1; i <= 9;i++){
        this.requestswapi({"urlpatch": "https://swapi.co/api/people/?page="+i}, function(data){
            if(data === false){
                res("Requete non valide!");
            }
            for(var e = 0; e < data.results.length; e++){
                if(data.results[e].hasOwnProperty('name') == false || data.results[e].hasOwnProperty('gender') == false ||data.results[e].hasOwnProperty('height') == false || data.results[e].hasOwnProperty('mass') == false || data.results[e].hasOwnProperty('films') == false){
                    res("Données non valide!")
                }
                retour.push({
                    "name": data.results[e].name,
                    "gender": data.results[e].gender,
                    "height": data.results[e].height,
                    "mass": data.results[e].mass,
                    "url_images": [
                        "https://vignette.wikia.nocookie.net/fr.starwars/images/5/5f/Yoda.png/revision/latest/scale-to-width-down/350?cb=20161009183018",
                        "http://i.f1g.fr/media/figaro/680x382_crop/2016/12/12/XVM2e138336-c06b-11e6-b6a7-75b5a9a24abf.jpg"
                    ],
                    "films": data.results[e].films
                });
            }
            res(retour);
        });
    }
}

/**
 * 
 * @param {*} req contient l'url a appeller 
 * @param {*} res retourne les datas recuperer par l'api
 */
exports.requestswapi = function(req, res){
    var arg = {
        headers: 
        { 
           "Content-Type": "application/json"
        }
    };
    client.get(req.urlpatch, arg, function(data, response) {
        if(data.hasOwnProperty('results') == false){
            res(false);
        }
        res(data);
    }).on('error', function(error) {
        logger.wlog({type: "ERROR", message: "Problème appelle swapi."});
        res(false);
    });
}