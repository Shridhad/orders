const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const OrderSchema = new Schema({
  description: { type: String, required: true },
  price: {type: Number, required: true},
  customer: {
    name: {type: String, required:  true},
    email: {type: String}
  }
});

module.exports = mongoose.model('order', OrderSchema);
