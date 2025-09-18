const connectDB = require("../db/connect");

// রোগীর যত এপিআই আছে সব এখানে আসবে।
//After creating the controllig operation export from here and import it to patientRoutes.js
// এখানে অপারেশন মেথড শেষ করে এটা patientRoutes.js এ দিয়ে endpoint সেট করে ঐখানে ইম্পোর্ট করে নেন।
// এখানে অপারেশনের নামটা রিলেটেড দিয়েন, যাতে বুঝা যায় এটা দিয়ে কি করা হচ্ছে।

// This is get method to get all patient list in an Array
exports.getAllPatients = async (req, res) => {
    try {
        const db = await connectDB();
        const patients = await db.collection("patients").find().toArray();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// This is a post Method to create patient
exports.createPatient = async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("patients").insertOne(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createAnApplication = async (req, res) => {
    const applicationData = req.body;
    try {
        const db = await connectDB();
        // added validation is email is exist do not take again
        const existingApplication = await db.collection("applications").findOne({ email: applicationData.email });
        if (existingApplication) {
            return res.status(400).json({ error: "Application already exists for this email." });
        }
        const result = await db.collection("applications").insertOne(applicationData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
