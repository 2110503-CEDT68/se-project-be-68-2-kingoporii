const mongoose = require("mongoose");

const RoomServiceSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Booking"
  },
  serviceType: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model("RoomService", RoomServiceSchema);