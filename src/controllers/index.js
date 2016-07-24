const Order = require('../models/order');

exports.getOrders = {
    handler: function(request, reply) {
        Order.find({}, function(error, orders) {
            if (!error) {
                reply(orders);
            } else {
                reply(Boom.badImplementation(error));
            }
        });
    }
};
