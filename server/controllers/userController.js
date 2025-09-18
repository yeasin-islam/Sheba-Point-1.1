const { ObjectId } = require("mongodb");
const connectDB = require("../db/connect");

// রোগীর যত এপিআই আছে সব এখানে আসবে।
//After creating the controllig operation export from here and import it to userRoutes.js
// এখানে অপারেশন মেথড শেষ করে এটা userRoutes.js এ দিয়ে endpoint (মানে যেএন্ডপয়েন্টে হিট করে ডাটা টা পেতে চাচ্ছেন।) সেট করে ঐখানে ইম্পোর্ট করে নেন।
// এখানে অপারেশনের নামটা রিলেটেড দিয়েন, যাতে বুঝা যায় এটা দিয়ে কি করা হচ্ছে।

// This is GET method to find all users in an Array
exports.getAllUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This is a GET method to find a specific user data
exports.getUserById = async (req, res) => {
  try {
    const db = await connectDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This is POST methid to create a user
exports.createUser = async (req, res) => {
  try {
    const db = await connectDB();
    const { email, name, role, lastLogin, creationTime } = req.body;
    console.log(email);
    const isUserExist = await db.collection("users").findOne({ email });
    if (isUserExist) {
        const result = await db.collection("users").updateOne(
          { email },
          { $set: {lastLogin} }
        );
      return res.send(result, { message: "User already exists" });
    
    } else {
      console.log("user Nai");
      const result = await db.collection("users").insertOne(req.body);
      res.status(201).json(result);
    }
    // console.log(isUserExist)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.testUser = async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("users").insertOne(req.body);
  res.status(201).json(result);
};

// This is POST Method to update user data
exports.updateUser = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This is delete method to delete user data
exports.deleteUser = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
