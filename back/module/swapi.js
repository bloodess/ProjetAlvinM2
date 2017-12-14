"use strict";

var fs = require('fs'); 

var Client = require('node-rest-client').Client;
var client = new Client();

var request = require('sync-request');

exports.films = function(req, res){
    var id = [req.filmTop, req.filmBot];

    fs.readFile("./module/data/dataFilmsswapi.json", function(err, datas){
        //todo mettre les films dans le bon sens d'arriver
        res(JSON.parse(data).filter(function(req){
            return req.id == id[1] || req.id == id[0];
        }));
    });

}

exports.getPeoplesData = function(res) {
    var peoples = [];
    
    // lecture de tous les peoples dans le fichier json en local
    fs.readFile("./module/data/dataPeopleswapi.json", function(err, datas){
        var data = JSON.parse(datas);
        var nbpeoples = data.length;
        
        for(var i = 0; i < 10; i++){
            // ont tire un chiffre pour selectionner un people dans la liste
            var sel = Math.round(Math.random() * (nbpeoples - 0) + 0);
            var films = [];

            for(var u = 0; u < data[sel].films.length; u++){
                var taillestring = data[sel].films[u].length;
                films.push(parseInt(data[sel].films[u].substring(taillestring-2, taillestring-1)));
            }
           
            peoples.push({
                "name": data[sel].name,
                "gender": data[sel].gender,
                "height": data[sel].height,
                "mass": data[sel].mass,
                "url_image": data[sel].url_image,
                "films" : films
            });
                
        }
        res(peoples);
    });
   
}


// automatiser a le faire 1 fois par semaine/1fois jours pour les possibles mise a jours 
exports.prepareDataToLocal = function(req, res){
    this.getAllPeopleSwapi(function(data){
        fs.writeFile("./module/data/dataPeopleswapi.json", JSON.stringify(data), function(err) {
            if(err) {
                console.log(err);
            }
        }); 
    });

    this.getAllFilmsSwapi(function(data){
        fs.writeFile("./module/data/dataFilmsswapi.json", JSON.stringify(data), function(err) {
            if(err) {
                console.log(err);
            }
        }); 
    });

}

exports.getAllFilmsSwapi = function(res){
    var retour = [];
    this.requestswapi({"urlpatch": "https://swapi.co/api/films/?page=1"}, function(data){
        for(var e = 0; e < data.results.length; e++){
            retour.push({
                "id": e+1,
                "title": data.results[e].title,
                // "opening_crawl":data.results[e].opening_crawl,
                "episode_id":data.results[e].episode_id,
                "release_date":data.results[e].release_date,
                "url_image":"https://images-na.ssl-images-amazon.com/images/I/51H4KT8A0FL._SY445_.jpg"
            });
        }
        res(retour);
    });
    
}

exports.getAllPeopleSwapi = function(res){
    var retour = [];
    
    for(var i = 1; i <= 9;i++){
        this.requestswapi({"urlpatch": "https://swapi.co/api/people/?page="+i}, function(data){
            if(data === false){
                res("Requete non valide!");
            }

            for(var e = 0; e < data.results.length; e++){
                retour.push({
                    "name": data.results[e].name,
                    "gender": data.results[e].gender,
                //  "species": data.results[e].species,
                //  "planet_orgin": data.results[e].homeworld,
                    "height": data.results[e].height,
                    "mass": data.results[e].mass,
                    "url_image": "https://vignette.wikia.nocookie.net/fr.starwars/images/5/5f/Yoda.png/revision/latest/scale-to-width-down/350?cb=20161009183018",
                    "films": data.results[e].films
                });
            }
            res(retour);

        });
    }
}

exports.requestswapi = function(req, res){
    var arg = {
        headers: 
        { 
           "Content-Type": "application/json"
        }
    };
    client.get(req.urlpatch, arg, function(data, response) {
        res(data);
    }).on('error', function(error) {
        res(false);
    });
}