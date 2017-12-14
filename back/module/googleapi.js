'use strict';

var Client = require('node-rest-client').Client;
var client = new Client();
var searchType = 'image';
var safe = 'off';
var key = 'AIzaSyAfI9vDrYuRzNVHfXdxjc58dW6tInLiyNk'
var cx = '013773035180240197132:wb9fxn31moc';

var url = 'https://www.googleapis.com/customsearch/v1?key='+key+'&cx='+cx+'&q=';

// GET https://www.googleapis.com/customsearch/v1?key=INSERT_YOUR_API_KEY&cx=017576662512468239146:omuauf_lfve&q=lectures



http.get(url, (res) => {
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
        const parsedData = JSON.parse(rawData);
        return(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });

module.exports = images;




    
 