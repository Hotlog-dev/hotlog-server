const RegisterController = require('../controller/register.controller')
const LogController = require('../controller/log.controller')
module.exports = {
    '/api/register::POST': RegisterController,
    '/api/logs::POST': LogController.post,
    '/api/logs/watch::GET': LogController.watch
}
