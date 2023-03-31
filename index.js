'use strict';
const $http = require('http');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

let HTTPRouter = require('./router/router.entrypoint');
let stores = {
    'clients': require('./store/clients.store.js')(),
    'logs': require('./store/logs.store.js')()
}
const HTTPServer = $http.createServer(function (request, response) {
    /* @see https://gist.github.com/balupton/3696140 and https://bigcodenerd.org/enable-cors-node-js-without-express/ */
    response.setHeader('Access-Control-Allow-Origin', process.env.NODE_HTTP_CORS_ALLOW_ORIGIN);
    if (request.method === 'OPTIONS') {
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        return response.end();
    }
    HTTPRouter(request, response, stores)
});
HTTPServer.listen(process.env.NODE_HTTP_PORT, process.env.NODE_HTTP_HOST, function () {
    console.log(`HTTPServer : Listening on http://${process.env.NODE_HTTP_HOST}:${process.env.NODE_HTTP_PORT}`);
});

process.on('uncaughtException', function (err) {
    console.log('PROCESS: uncaughtException - HTTPServer closed.', err)
    HTTPServer.close();
    process.exit(1);
});
process.on('SIGTERM', function () {
    console.log('PROCESS: SIGTERM - HTTPServer closed.')
    HTTPServer.close();
    process.exit(1);
});

