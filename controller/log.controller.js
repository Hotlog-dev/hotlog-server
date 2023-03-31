const uuid = require('uuid')

exports.watch = function (request, response, stores) {
    response.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    });

    stores.logs.subscribe('add', function(data){
        let id = Date.now();
        let type = 'message';
        let message = `id:${id}\ntype:${type}\ndata:${JSON.stringify(data)}\n\n`
        response.write(message);
    })
    request.on('close', () => {
       //do something ?
    })
    // response.end();
}

exports.post = function (request, response, stores) {
    response.writeHead(200);
    if (request._data) {
        stores.logs.add({...request._data, id: uuid.v4()})
    }
    response.end();
}

