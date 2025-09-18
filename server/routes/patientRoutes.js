const express = require("express");
const { getAllPatients, createPatient, createAnApplication, getAllDoctorApplications } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);
router.post('/doctor-apply',createAnApplication)
router.get('/doctor-apply',getAllDoctorApplications)

module.exports = router;
