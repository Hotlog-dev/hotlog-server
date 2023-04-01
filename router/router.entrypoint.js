const routes = require('./router.routes.js')
module.exports = function (request, response, stores) {
    // let url = request.url.startsWith('/') ? request.url.substring(1) : request.url;
    let url = request.url;
    //The UI serves multiple files dans cannot be checked with === on url
    if(url.startsWith('/ui')){
        url = '/ui'
    }
    let body = '';
    request.on('data', chunk => {
        body += chunk;
    })
    request.on('end', () => {
        request._data = (body.length > 0) ? JSON.parse(body) : null;
        const routePath = `${url}::${request.method.toUpperCase()}`
        if (Object.prototype.hasOwnProperty.call(routes, routePath)) {
            let controller = routes[routePath];
            controller.call(null, request, response, stores);
        } else {
            response.writeHead(404).end('No route found.')
        }
    })
}
