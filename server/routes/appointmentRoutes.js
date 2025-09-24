const express = require("express");
const { createAppointment, getAllAppointment } = require("../controllers/appointmentController");
const connectDB = require("../db/connect");

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointment);

// ---------------------------------
router.delete("/", async (req, res) => {
    try {
        const db = await connectDB();
        await db.collection("appointments").deleteMany({});
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// get all payment records form payments collection
router.get("/payments", async (req, res) => {
    try {
        const db = await connectDB();
        const payments = await db.collection("payments").find().toArray();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// delete all payment records form payments collection
router.delete("/payments", async (req, res) => {
    try {
        const db = await connectDB();
        await db.collection("payments").deleteMany({});
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
