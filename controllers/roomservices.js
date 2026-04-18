// controllers/roomservices.js

const RoomService = require("../models/RoomService");
const Booking = require("../models/Booking");

exports.createRoomService = async (req, res) => {
  try {
    const booking = await Booking.findById(req.body.bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const service = await RoomService.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getRoomServicesByBooking = async (req, res) => {
  const services = await RoomService.find({
    bookingId: req.params.bookingId
  });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
};

exports.updateRoomServiceStatus = async (req, res) => {
  const service = await RoomService.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: service
  });
};