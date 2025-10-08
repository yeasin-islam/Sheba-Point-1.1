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
  const applicationData = { ...req.body, status: "pending" };
  try {
    const db = await connectDB();
    // added validation is email is exist do not take again
    const existingApplication = await db
      .collection("applications")
      .findOne({ email: applicationData.email });
    if (existingApplication) {
      return res
        .status(201)
        .json({ error: "Application already exists for this email." });
    }
    const result = await db
      .collection("applications")
      .insertOne(applicationData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDoctorApplications = async (req, res) => {
  try {
    const db = await connectDB();
    const applications = await db.collection("applications").find().toArray();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept doctor application (update status to 'accepted')
exports.acceptDoctorApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDB();
    const result = await db
      .collection("applications")
      .updateOne(
        { _id: require("mongodb").ObjectId(id) },
        { $set: { status: "accepted" } }
      );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Application not found." });
    }
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject doctor application (delete from collection)
exports.rejectDoctorApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDB();
    const result = await db
      .collection("applications")
      .deleteOne({ _id: require("mongodb").ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Application not found." });
    }
    res.json({ success: true, id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.patientProfileUpdate = async (req, res) => {
  const db = await connectDB();
  const { email, ...formData } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const result = await db.collection("users").updateOne(
      { email },
      {
        $set: {
          ...formData,
          updatedAt: new Date(),
        },
      }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};
