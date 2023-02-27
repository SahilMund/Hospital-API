const mongoose = require("mongoose");

//Patient Schema
const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // phone number will be used to check if the patient is already exists or not
    phone: {
      type: Number,
      required: true,
      unique: true,
    },

    // This report array will store the reports id, and this will be populated with the report id every time the doctor creates a report for this user
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// exports user
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
