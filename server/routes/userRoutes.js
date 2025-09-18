const express = require("express");
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, testUser } = require("../controllers/userController");

const router = express.Router();


// ইউজার রিলেডেট সকল ক্রাড অপারেশন আগে cotrollers/userController.js এর ভিতরে লিকে এখানে endpoint দিয়ে সেট ইম্পোর্ট করে ফেলবেন।

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/test", testUser);
module.exports = router;
