'use strict';

const Hapi = require('hapi'),
      config = require('./config/config'),
      Mongoose = require('mongoose');


Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

const server = new Hapi.Server();
server.connection({ port: 3333 });

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello, world!');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
