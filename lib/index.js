var http = require('http');

var express = function(){

    var app = function(request, response){

        response.statusCode = 404;
        response.end('not found');

    };

    app.listen = function(port, callback){

        var port = port || 4000;
        var callback = callback || function(){};

        var server = http.createServer(this);
        server.listen(port, function(){
            callback();
        });

        return server;

    };

    return app;

};

module.exports = express;
