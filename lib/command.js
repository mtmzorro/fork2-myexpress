/**
 * [command.js]
 */

module.exports = function(){

    var minimist = require('minimist');
    var express = require('../lib/');

    // var argv = minimist(process.argv.slice(2));
    // var root = argv._[0] ? argv._[0] : process.cwd();
    // var port = argv.port ? argv.port : 4000;

    app = express();

    // start the http server
    var http = require("http");
    var server = http.createServer(app);
    server.listen(4000);

};

