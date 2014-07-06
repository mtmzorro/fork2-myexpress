var express = require("../lib/");
var request = require("supertest");
var http = require("http");

describe("create app",function() {

    var app = express();

    describe("create http server",function() {
        it("/foo should responds 404", function(done) {
            var server = http.createServer(app);
            request(app)
                .get('/foo')
                .expect(404)
                .end(done);
        });
    });

    describe("listen port",function() {

        before(function(done) {
           var server = app.listen(7000, done);
        });

        it("/foo should responds 404", function(done) {
            request('http://localhost:7000')
                .get('/foo')
                .expect(404)
                .end(done);
        });
    });


});