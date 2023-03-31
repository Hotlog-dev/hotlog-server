module.exports = function (events) {
    let handlers = {};  // observers
    events.forEach(key => handlers[key] = []);
    return {
        subscribe: function (event, fn) {
            if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
                throw 'Event not allowed'
            }
            handlers[event].push(fn);
        },
        unsubscribe: function (event, fn) {
            if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
                throw 'Event not allowed'
            }
            handlers = handlers[event].filter(
                function (item) {
                    if (item !== fn) {
                        return item;
                    }
                }
            );
        },
        fire: function (event, data) {
            if (!Object.prototype.hasOwnProperty.call(handlers, event)) {
                throw 'Event not allowed'
            }
            handlers[event].forEach(function (item) {
                item.call(null, data);
            });
        }
    }
}
