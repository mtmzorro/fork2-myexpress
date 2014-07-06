var http = require('http');

var express = function(){

    var app = function(request, response){

        var stack = app.stack;
        var stackProgress = 0;

        if(stack.length === 0){
            // no middleware
            response.statusCode = 404;
            response.end('not found');
        }else{
            var next = function(){
                
                stackProgress += 1;
                if(stackProgress === stack.length){
                    response.statusCode = 404;
                    response.end('not found');
                }else{
                    stack[stackProgress](request, response, next);
                }
                
            };
            
            stack[stackProgress](request, response, next);
        }

    };

    app.stack = [];

    app.listen = function(port, callback){

        var port = port || 4000;
        var callback = callback || function(){};

        // creat server
        var server = http.createServer(this);
        server.listen(port, function(){
            callback();
        });

        return server;

    };
    
    app.use = function(middleWare){

        this.stack.push(middleWare);

    }

    return app;

};

module.exports = express;
