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
  },
  shipped: {
    type: Boolean,
    default: false
  },
  customerName: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  }
});

const CustomerOrder= mongoose.model('CustomerOrder', orderSchema);
module.exports = CustomerOrder;
