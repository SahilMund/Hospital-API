const mongoose = require("mongoose");
//Reports Schema
const reportSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    status: {
      //  status field must be from the enum list
      type: String,
      enum: [
        "Negative",
        "Travelled-Quarantine",
        "Symptoms-Quarantine",
        "Positive-Admit",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// exports user
const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
