const Order = require('../models/order'),
      Boom = require('boom');

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

exports.getOrder = {
    handler: function(request, reply) {
        Order.findOne({
            '_id': request.params.orderId
        }, function(error, order) {
            if(error) {
              return reply(Boom.badImplementation(error));
            }
            if (!order) {
                return reply(Boom.notFound('Order Not Found'));
            }
            return reply(order);
        });
    }
};
