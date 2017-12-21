
var fs = require('fs'); 

/**
 * Ecrit dans un fichier texte des logs
 * @param {*} req type = ERROR, INFOS
 */
exports.wlog = function(req){
    var data = fs.readFileSync("./module/log/log.txt", 'utf8');
    var date = new Date();
    var arg = data +"\n"+ date + " - " + req.type + " - " + req.message;
    fs.writeFileSync("./module/log/log.txt", arg, 'utf8');
}