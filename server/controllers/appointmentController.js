const connectDB = require("../db/connect");

// This is POST method to createAppointment
exports.createAppointment = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("appointments").insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// This is GET method to get all Appointment
exports.getAllAppointment = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("appointments").find().toArray();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};