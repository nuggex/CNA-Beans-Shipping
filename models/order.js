const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  invoiceId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  town: { type: String, required: true },
  state: { type: String, required: true },
  date: { type: Date, required: true },
  phoneNumber: { type: Number, required: true },
  zipCode: { type: Number, required: true },
  tracking: {type: String, required: true }
});

module.exports = mongoose.model('Order',orderSchema);