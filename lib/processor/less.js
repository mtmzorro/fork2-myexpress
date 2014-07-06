var fs = require('fs');
var less = require('less');
var path = require('path');

module.exports = makeLess;

function makeLess(root){

    // less middleware
    var lessMiddleware = function(request, response, next){

        var filePath = root + request.url;
        var extname = path.extname(request.url);

        var isCss = (extname === '.css');
        var isLess = (extname === '.less');

        fs.readFile(filePath, {encoding: "utf8"}, function (err, data) {

            if (err) {
                // not found
                if (isCss) {
                    // *.css
                    
                    // replace html to jade
                    filePath = filePath.replace(/.css/g, '.less');

                    fs.readFile(filePath, {encoding: "utf8"}, function (err, data) {
                        if(err){
                            next();
                        }else{
                            randerLess(data, response);
                        }
                    });
                }else{
                    // other file
                    next();
                }
            } else {
                // found
                if (isLess) {
                    // *.less
                    randerLess(data, response);
                }else{
                    // *.css & other file
                    next();
                }
            }
            
        });

    };

    return lessMiddleware;
};

/**
 * [randerLess randerLess]
 * @param  {[String]} data     [file data]
 * @param  {[Object]} response [respinse]
 */
function randerLess(data, response){

    less.render(data, function (err, css) {
        if(err){
            return console.error(err);
        }else{
            // write Head
            response.writeHead(200, {
                'Content-Length': css.length,
                'Content-Type': 'text/css; charset=UTF-8'
            });
            response.end(css);
        }
    });

};

