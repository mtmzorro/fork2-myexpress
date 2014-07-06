var path = require('path');

module.exports = reject;

function reject(){

    // reject middleware
    var rejectMiddleware = function(request, response, next){

        var extname = path.extname(request.url);

        if(extname === '.jade' || extname === '.less'){
            response.statusCode = 404;
            response.end('not found');
        }else{
            next();
        }

    };

    return rejectMiddleware;
};