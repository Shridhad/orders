'use strict';

const Hapi = require('hapi'),
      config = require('./config/config'),
      controller = require('./src/controllers'),
      Db = require('./config/db');

const server = new Hapi.Server();
server.connection({port: config.server.port});
server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
});

server.route({
  method: 'GET',
  path: '/orders',
  config: controller.getOrders
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
