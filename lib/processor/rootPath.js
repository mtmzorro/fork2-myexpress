module.exports = rootPath;

function rootPath(){

    // rootPath middleware
    var rootPathMiddleware = function(request, response, next){

        var url = request.url;

        if(url === '/'){
            request.url = '/index.html';
        }

        next();
    };

    return rootPathMiddleware;
};