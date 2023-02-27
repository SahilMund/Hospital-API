const express = require("express");
const router = express.Router();
const passport = require("passport");
const { patientController } = require("../../../controllers");

// Patient Registration route , it is a protected route as only signed In doctors can register the patient
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.register
);

// Create Patient report, it is also a protected route
router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);

// Fetch all the reports of a patient oldest to latest
router.get("/:id/all_reports", patientController.fetchPatientReport);

module.exports = router;
