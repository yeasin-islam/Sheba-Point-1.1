const express = require("express");
const { getAllPatients, createPatient, createAnApplication } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.post('/doctor-apply',createAnApplication)

module.exports = router;
