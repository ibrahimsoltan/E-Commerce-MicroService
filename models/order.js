const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  products: [{
    type: Object,
    required: true
  }],
  total: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
