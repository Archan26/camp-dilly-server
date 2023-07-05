const mongoose = require('mongoose');

// customerSchema schema
const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  typeOfCustomer: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  siteName: {
    type: Array,
    required: true,
  },
  packageType: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  dayPicnicTime: {
    type: String,
  },
  overNightRooms: {
    type: Number,
  },
  overNightCrossCamp: {
    type: Number,
  },
  overNightTent: {
    type: Number,
  },
  overNightSkyRooms: {
    type: Number,
  },
  overNightDay: {
    type: Number,
  },
  foodPreference: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  advancePayment: {
    type: Number,
    required: true
  },
  totalPayment: {
    type: Number,
    required: true
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  Customer
};