const randomColor = require('randomcolor')
const uuid = require('uuid')
const { uniqueNamesGenerator,  animals, colors } = require('unique-names-generator');
module.exports = function (request, response, stores){
    response.writeHead(200);
    const client = {
        color: randomColor({
            luminosity: 'light',
        }),
        id: uuid.v4(),
        name: uniqueNamesGenerator({ dictionaries: [colors, animals], length: 2 })
    };
    stores.clients.add(client.id, client);
    response.write(JSON.stringify(client))
    response.end();
}
