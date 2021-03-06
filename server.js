'use strict';

const Hapi = require('hapi'),
      config = require('./config/config'),
      controller = require('./src/controllers'),
      Db = require('./config/db');

const server = new Hapi.Server();
server.connection({port: config.server.port});

server.route({ method: 'GET', path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
});

server.route({ method: 'GET', path: '/orders', config: controller.getOrders });
server.route({ method: 'GET', path: '/orders/{orderId}', config: controller.getOrder });
server.route({ method: 'POST', path: '/orders', config: controller.postOrder });
server.route({ method: 'DELETE', path: '/orders/{orderId}', config: controller.removeOrder });
server.route({ method: 'PUT', path: '/orders/{orderId}', config: controller.updateOrder });

server.start( err => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
