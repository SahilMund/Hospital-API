const mongoose = require("mongoose");

// Defining a schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      // email field will be used to check if the doctor is already registered or not
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//  creating a doctor model with the doctorSchema
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
