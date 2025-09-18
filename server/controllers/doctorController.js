const connectDB = require("../db/connect");
const { ObjectId } = require("mongodb");

// ডাক্তারী যত এপিআই আছে সব এখানে আসবে।
//After creating the controllig operation export from here and import it to doctorRoutes.js
// এখানে অপারেশন মেথড শেষ করে এটা doctorRoutes.js এ দিয়ে endpoint সেট করে ঐখানে ইম্পোর্ট করে নেন।
// এখানে অপারেশনের নামটা রিলেটেড দিয়েন, যাতে বুঝা যায় এটা দিয়ে কি করা হচ্ছে। 


// This is get method to get all doctors in an array
exports.getAllDoctors = async (req, res) => {
    try {
        const db = await connectDB();
        const doctors = await db.collection("doctors").find().toArray();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// This is get method to get a specific doctor details by doctors id
exports.getDoctorById = async (req, res) => {
    try {
        const db = await connectDB();
        const doctor = await db.collection("doctors").findOne({ _id: new ObjectId(req.params.id) });
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// this is a POST method to create a doctor
exports.createDoctor = async (req, res) => {
    try {
        const db = await connectDB();
        // doctor linked to user via userId
        const doctorData = { ...req.body, createdAt: new Date() };
        const result = await db.collection("doctors").insertOne(doctorData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// This is PUT method to update doctors information
exports.updateDoctor = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("doctors").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// This is DELETE method to delete a specific doctor object
exports.deleteDoctor = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("doctors").deleteOne({ _id: new ObjectId(req.params.id) });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};