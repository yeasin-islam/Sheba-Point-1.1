const express = require("express");
const { createAppointment, getAllAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointment);

module.exports = router;
