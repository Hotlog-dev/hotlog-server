const fs = require('fs');
const path = require('path');
const allowedTypes = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    json: 'application/json',
    xml: 'application/xml',
};

module.exports = function (request, response, stores) {
    if (process.env.HOTLOG_UI_PATH) {
        const requestedUrl = request.url.replace('/ui', '');
        //@see https://www.30secondsofcode.org/articles/s/nodejs-static-file-server/
        const root = path.normalize(path.resolve(process.env.HOTLOG_UI_PATH));
        const extension = path.extname(requestedUrl).slice(1);
        const type = extension ? allowedTypes[extension] : allowedTypes.html;
        const supportedExtension = Boolean(type);

        if (!supportedExtension) {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('404: File not found');
            return;
        }

        let fileName = requestedUrl;
        if (requestedUrl === '/ui') fileName = 'index.html';
        else if (!extension) {
            try {

                fs.accessSync(path.join(root, requestedUrl + '.html'), fs.constants.F_OK);
                fileName = requestedUrl + '.html';
            } catch (e) {
                fileName = path.join(requestedUrl, 'index.html');
            }
        }

        const filePath = path.join(root, fileName);
        const isPathUnderRoot = path
            .normalize(path.resolve(filePath))
            .startsWith(root);

        if (!isPathUnderRoot) {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('404: File not found');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end('404: File not found');
            } else {
                response.writeHead(200, {'Content-Type': type});
                response.end(data);
            }
        });
    }
    else{
        response.writeHead(400)
        response.end()
    }
}

