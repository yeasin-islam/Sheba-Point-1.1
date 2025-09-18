const express = require("express");
const { getAllDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor } = require("../controllers/doctorController");
const router = express.Router();


//Set endpoint in a professional convention

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
