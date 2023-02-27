const express = require("express");
const router = express.Router();
const { reportController } = require("../../../controllers");

// fetch all the reports of all the patients filtered by a specific given status
router.get("/:status", reportController.fetchReportsByStatus);

module.exports = router;
