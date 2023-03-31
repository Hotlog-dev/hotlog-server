
module.exports = function(){
    const clients = new Map()
    return {
        get:(id)=> clients.get(id),
        add: (id, client) => {
            !clients.has(id) && clients.set(id, client)
        },
        remove: (id) => {
            clients.has(id) && clients.delete(id)
        }
    }
}
