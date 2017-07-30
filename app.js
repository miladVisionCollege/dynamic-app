var router = require('./router.js');
var http = require('http');
var fs = require("fs");

var server = http.createServer(function (request, response) {
  	router.css(request, response);
    router.home(request,response);
  	router.user(request,response);
});

server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");

