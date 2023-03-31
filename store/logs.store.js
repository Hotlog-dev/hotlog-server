
const eventbus = require('../services/eventbus')
module.exports = function(){
    const logs = new Map()
    const bus = eventbus(['add'])
    return {
        add: (log) => {
            !logs.has(log.id) && logs.set(log.id, log)
            bus.fire('add', log)
        },
        subscribe: bus.subscribe
    }
}
