const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  maps: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  images: [String],
  ticketPrices: [
    {
      category: String,
      price: Number,
    },
  ],
  free: [Boolean],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
