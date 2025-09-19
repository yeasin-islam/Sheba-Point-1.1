const express = require("express");
const { getAllPatients, createPatient, createAnApplication, getAllDoctorApplications, acceptDoctorApplication, rejectDoctorApplication } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getAllPatients);
router.post("/", createPatient);

// Doctor application endpoints
router.post('/doctor-apply', createAnApplication);
router.get('/doctor-apply', getAllDoctorApplications);
router.patch('/doctor-apply/:id/accept', acceptDoctorApplication);
router.delete('/doctor-apply/:id/reject', rejectDoctorApplication);

module.exports = router;
