const express = require("express");
const { getAllUsers, createUser, updateUser, deleteUser, testUser, deleteAllUsers, getUserByEmail } = require("../controllers/userController");

const router = express.Router();


// ইউজার রিলেডেট সকল ক্রাড অপারেশন আগে cotrollers/userController.js এর ভিতরে লিকে এখানে endpoint দিয়ে সেট ইম্পোর্ট করে ফেলবেন।

router.get("/", getAllUsers);
router.get("/:email", getUserByEmail);
router.post("/register", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllUsers);
module.exports = router;
