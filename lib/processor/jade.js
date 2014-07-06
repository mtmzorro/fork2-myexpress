var fs = require('fs');
var jade = require('jade');
var path = require('path');

module.exports = makeJade;

function makeJade(root){

    // jade middleware
    var jadeMiddleware = function(request, response, next){

        var filePath = root + request.url;
        var extname = path.extname(request.url);

        var isHtml = (extname === '.html' || extname === '.htm');
        var isJade = (extname === '.jade');

        fs.readFile(filePath, {encoding: "utf8"}, function (err, data) {

            if (err) {
                // not found
                if (isHtml) {
                    // *.html & *.htm
                    
                    // replace html to jade
                    filePath = filePath.replace(/.html/g, '.jade');

                    fs.readFile(filePath, {encoding: "utf8"}, function (err, data) {
                        if(err){
                            next();
                        }else{
                            randerJade(data, response);
                        }
                    });
                }else{
                    // other file
                    next();
                }
            } else {
                // found
                if (isJade) {
                    // *.jade
                    randerJade(data, response);
                }else{
                    // *.html & other file
                    next();
                }
            }
            
        });

    };

    return jadeMiddleware;
};

/**
 * [randerJade randerJade]
 * @param  {[String]} data     [file data]
 * @param  {[Object]} response [respinse]
 */
function randerJade(data, response){

    var html = jade.render(data);
    // write Head
    response.writeHead(200, {
        'Content-Length': html.length,
        'Content-Type': 'text/html; charset=UTF-8'
    });
    response.end(html);

};

