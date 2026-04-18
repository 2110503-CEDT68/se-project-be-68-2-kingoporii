const express = require("express");
const {
  createRoomService,
  getRoomServicesByBooking,
  updateRoomServiceStatus
} = require("../controllers/roomservices");

const router = express.Router();

// POST /api/v1/roomservices
router.post("/", createRoomService);

// GET /api/v1/roomservices/booking/:bookingId
router.get("/booking/:bookingId", getRoomServicesByBooking);

// PUT /api/v1/roomservices/:id
router.put("/:id", updateRoomServiceStatus);

module.exports = router;