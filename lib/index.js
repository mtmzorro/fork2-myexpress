var http = require('http');

var express = function(){

    var app = function(request, response){

        // middleware stack
        var stack = app.stack;
        // stack progress num
        var stackProgress = 0;

        if(stack.length === 0){
            // no middleware
            response.statusCode = 404;
            response.end('not found');
        }else{

            var next = function(err){

                var middleware = stack[stackProgress];
                
                if(typeof middleware === 'undefined'){
                    if(err){
                        response.statusCode = 500;
                        response.end();
                    }else{
                        response.statusCode = 404;
                        response.end('not found');
                    };
                    return;
                }else{
                    var argvLength = middleware.length;
                    stackProgress ++;
                    try{
                        if(err){
                            if(argvLength === 4){
                                middleware(err, request, response, next);
                            }else{
                                next(err);
                            }
                        }else{
                            if(argvLength < 4){
                                middleware(request, response, next);
                            }else{
                                next();
                            }
                        }
                    }catch(err){
                        response.statusCode = 500;
                        response.end();
                    }
                }
                
            };
            // start call middleware
            next();
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
        // console.log(middleWare instanceof app)
        if(middleWare.hasOwnProperty('stack')){
            for(var i in middleWare.stack){
                this.stack.push(middleWare.stack[i]);
            }
        }else{
            this.stack.push(middleWare);
        }

    };

    return app;

};

module.exports = express;
