const Lab = require('lab'),
  Code = require('code'),
  sinon = require('sinon'),
  expect = Code.expect,
  lab = exports.lab = Lab.script();

const server = require('../../server.js'),
  Order = require('../../src/models/order');

lab.describe('orders', () => {
  var order = {description: 'First Order', price: 100, customer: {name: 'Name'}};

  lab.it('should get orders', (done) => {
    sinon.stub(Order, 'find', (query, callback) => callback(null, [order]));

    server.inject({ method: 'GET', url: '/orders'}, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.payload)).to.equal([order]);

      Order.find.restore();
      done();
    });
  });

  lab.it('should get order give a order id', (done) => {
    sinon.stub(Order, 'findOne', (query, callback) => {
      expect(query).to.equal({_id: 'orderId'});
      callback(null, order);
    });

    server.inject({ method: 'GET', url: '/orders/orderId'}, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.payload)).to.equal(order);

      Order.findOne.restore();
      done();
    });
  });

  lab.describe("post order", () => {
    lab.it('should validate description in payload', (done) => {
      sinon.spy(Order.prototype, 'save');

      server.inject({ method: 'POST', url: '/orders', payload: {}}, (response) => {
        expect(response.statusCode).to.equal(400);
        expect(Order.prototype.save.called).to.be.false();

        Order.prototype.save.restore();
        done();
      });
    });

    lab.it('should validate price in payload', (done) => {
      sinon.spy(Order.prototype, 'save');
      const payload = {description: 'description'};

      server.inject({ method: 'POST', url: '/orders', payload: payload}, (response) => {
        expect(response.statusCode).to.equal(400);
        expect(Order.prototype.save.called).to.be.false();

        Order.prototype.save.restore();
        done();
      });
    });

    lab.it('should validate customer in payload', (done) => {
      sinon.spy(Order.prototype, 'save');
      const payload = {description: 'description', price: 100};

      server.inject({ method: 'POST', url: '/orders', payload: payload}, (response) => {
        expect(response.statusCode).to.equal(400);
        expect(Order.prototype.save.called).to.be.false();

        Order.prototype.save.restore();
        done();
      });
    });

    lab.it('should create new order', (done) => {
      sinon.spy(Order.prototype, 'save');

      server.inject({ method: 'POST', url: '/orders', payload: order}, (response) => {
        expect(response.statusCode).to.equal(200);
        expect(Order.prototype.save.called).to.be.true();
        expect(JSON.parse(response.payload)).to.part.include(order);

        Order.prototype.save.restore();
        done();
      });
    });
  });

  lab.it('should delete order', (done) => {
    sinon.stub(Order, 'findOneAndRemove', (query, callback) => {
      expect(query).to.equal({_id: 'orderId'});
      callback(null, order);
    });

    server.inject({ method: 'DELETE', url: '/orders/orderId', payload: order}, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(Order.findOneAndRemove.called).to.be.true();
      expect(JSON.parse(response.payload)).to.part.include(order);

      Order.findOneAndRemove.restore();
      done();
    });
  });

  lab.it('should update order', (done) => {
    sinon.stub(Order, 'findOneAndUpdate', (query, payload, callback) => {
      expect(query).to.equal({_id: 'orderId'});
      expect(payload).to.equal(order);
      callback(null, order);
    });

    server.inject({ method: 'PUT', url: '/orders/orderId', payload: order}, (response) => {
      expect(response.statusCode).to.equal(200);
      expect(Order.findOneAndUpdate.called).to.be.true();
      expect(JSON.parse(response.payload)).to.part.include(order);

      Order.findOneAndUpdate.restore();
      done();
    });
  });
});
