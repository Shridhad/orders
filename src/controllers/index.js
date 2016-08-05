const Order = require('../models/order'),
      Boom = require('boom');

const _reply = function(message, reply) {
  return function(error, response) {
    if(error) return reply(Boom.badImplementation(error));
    if(!response) return reply(Boom.notFound(message));
    return reply(response);
  };
};

exports.getOrders = {
    handler: function(request, reply) {
        Order.find({}, _reply('No Orders Found', reply));
    }
};

exports.getOrder = {
    handler: function(request, reply) {
        Order.findOne({
            '_id': request.params.orderId
        }, _reply("Order Not Found", reply));
    }
};
