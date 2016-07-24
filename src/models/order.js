const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const OrderSchema = new Schema({
  description : { type: String, required: true },
  price: {type: Number, require: true},
  customer: {
    name: {type: String, reqiure:  true},
    email: {type: String}
  }
});

module.exports = mongoose.model('order', OrderSchema);
