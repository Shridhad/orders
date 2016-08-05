const Order = require('../models/order'),
      Joi = require('joi'),
      Boom = require('boom');

const _reply = (message, reply) => {
  return (error, response) => {
    if(error) return reply(Boom.badImplementation(error));
    if(!response) return reply(Boom.notFound(message));
    return reply(response);
  };
};

exports.getOrders = {
    handler: (request, reply) => Order.find({}, _reply('No Orders Found', reply))
};

exports.getOrder = {
    handler: (request, reply) => {
      Order.findOne({'_id': request.params.orderId}, _reply("Order Not Found", reply));
    }
};

exports.postOrder = {
    validate: {
      payload: {
        customer: Joi.object().keys({
          name: Joi.string(),
          email: Joi.string().email()
        }),
        description: Joi.string().min(10),
        price: Joi.number().required()
      }
    },
    handler: (request, reply) => {
      var order = new Order(request.payload);
      order.save(_reply("", reply));
    }
};
