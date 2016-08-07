const Lab = require('lab'),
  Code = require('code'),
  expect = Code.expect,
  lab = exports.lab = Lab.script();

const Order = require('../../../src/models/order');

lab.experiment('order',  () => {

  lab.test('validate the presence of description', (done) => {
    const order = new Order();

    order.validate( (error) => {
      expect(error.message).to.equal('order validation failed');
      expect(error.errors.description).to.exist();
      expect(error.errors.description.message).to.equal("Path `description` is required.");
      done();
    });
  });

  lab.test('validate the presence of price', (done) => {
    const order = new Order({'description': 'This is order description'});

    order.validate( (error) => {
      expect(error.errors.price).to.exist();
      expect(error.errors.price.message).to.equal("Path `price` is required.");
      done();
    });
  });

  lab.test('validate price should be number', (done) => {
    const order = new Order({
      'description': 'This is order description',
      'price': 'This is invalid price'
    });

    order.validate( (error) => {
      expect(error.errors.price).to.exist();
      expect(error.errors.price.message).to.contain("Cast to Number failed for value");
      done();
    });
  });

  lab.test('validate presence of customer name', (done) => {
    const order = new Order({
      'description': 'This is order description',
      'price': 100
    });
    order.validate( (error) => {
      expect(error.message).to.equal('order validation failed');
      expect(error.errors['customer.name']).to.exist();
      expect(error.errors['customer.name'].message).to.contain("Path `customer.name` is required.");
      done();
    });
  });

  lab.test('valid order', (done) => {
    const order = new Order({
      'description': 'This is order description',
      'price': 100,
      'customer': {
        'name': 'Customer Name'
      }
    });
    order.validate( (error) => {
      expect(error).to.not.exist();
      done();
    });
  });
});
