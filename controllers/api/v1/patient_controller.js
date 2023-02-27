const Doctor = require("../../../models/doctor");
const Patient = require("../../../models/patient");
const Report = require("../../../models/report");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../../../config/passport-jwt-strategy");
const patStatus = require("../../../config/status-enum");

//Register the doctor in the db by using name,email and password
module.exports.register = async function (req, res) {
  const { name, phone } = req.body;

  //Check if any field is missed, then throw them error message
  if (!name || !phone) {
    return res.status(206).json({
      message: "Name or Phone field should not be empty",
      success: false,
    });
  }

  //  To prevent the users from entering text/alphabets in number field
  if (isNaN(phone)) {
    return res.status(422).json({
      message:
        "Entered phone number is unprocessable, Renter your phone number",
      success: false,
    });
  }

  //Check if the patient is already registered , then give them the same resp with the existing data
  let existingPatient = await Patient.findOne({ phone: phone });

  if (existingPatient) {
    // let { name, phone , doctor } = existingPatient;
    return res.status(405).json({
      data: {
        patient: existingPatient,
      },
      message: "Patient already Exists.",
      success: false,
    });
  }

  try {
    //  If the above checks are done, then we are good to register the user, lets create the user
    let newPatient = await Patient.create(req.body);

    if (newPatient) {
      let { _id, name, phone } = newPatient;

      // sending the response
      return res.status(200).json({
        data: {
          patient: { _id, name, phone },
        },
        message: "Patient Successfully registered",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//Create a Report for the patient using status and doctor ids
module.exports.createReport = async function (req, res) {
  let patientId = req.params.id;

  let { status: PatientStatus } = req.body;

  if (!PatientStatus) {
    return res.status(206).json({
      message: "Status for the patient is not provided",
      success: false,
    });
  }

  //    To prevent the users from entering text/alphabets in number field and also restricting the input to only have any of the defined status enums
  const statusKeys = Object.keys(patStatus).map((a) => Number(a));
  if (!statusKeys.includes(Number(PatientStatus))) {
    return res.status(422).json({
      message:
        "Invalid Status, refer the below given patient Status object for more Info",
      patStatus,
      success: false,
    });
  }


  //  Getting the jwt Token from authorization header to extract the doctor information from token's payload
  const jwtToken = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(jwtToken, JWT_SECRET_KEY);

  //  Getting doctors Id to add it to our report model
  let doctorId = payload._id;

  if (!patientId || !doctorId) {
    return res.status(500).json({
      message: "Something went wrong, please try again",
      success: false,
    });
  }

  //   get/mapping status of the patient from config folder
  PatientStatus = patStatus[req.body.status];
  try {
    let patient = await Patient.findById(patientId);
    let doctor = await Doctor.findById(doctorId);

    //If the patient and doctor both exists only then create the report
    if (patient && doctor) {
      const reportData = {
        doctor: doctorId,
        patient: patientId,
        status: PatientStatus,
      };
      let report = await Report.create(reportData);
      if (report) {
        //pushing the new report in the patient's report array
        await patient.reports.push(report);
        await patient.save();
      }

      // sending back the json response to the user
      return res.status(200).json({
        data: {
          report: {
            patient: patient.name,
            status: report.status,
            doctor: doctor.name,
            date: report.createdAt,
          },
        },
        message: "Report successfully Created",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Patient/Doctor is not Registered",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      error: {
        name: err.name,
        msg: err.message,
      },
      success: false,
    });
  }
};

//fetch All reports of a patient
module.exports.fetchPatientReport = async function (req, res) {
  try {
    const { id } = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid(id);

    //  Check if the patient ID is valid or not
    if (!isValidId) {
      return res.status(401).json({
        message: "Invalid Patient Id Input",
        success: false,
      });
    }
    // Check if the patient is registered or not
    let patient = await Patient.findOne({ _id: id });
    console.log(patient);

    if (!patient) {
      return res.status(404).json({
        message:
          "Entered Patient details not found, Make sure the patient is registered before generating the report",
        success: false,
      });
    }

    // Getting the patientId from req.params , also populating both doctor and patient details
    let report = await Report.find({ patient: id })
      .sort("createdAt")
      .populate("doctor")
      .populate("patient");

    //  Patient is present and report is null, meaning for the patient there is no record
    if (report.length === 0) {
      return res.status(404).json({
        message: `No Report Record found for the entered patient - ${patient.name}`,
        success: true,
      });
    }

    // Sending back the JSON response with the below details
    return res.status(200).json({
      data: {
        report,
      },
      message: `report generated successfully for the patient - ${patient.name}`,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      success: false,
      errorMSg: err.message,
    });
  }
};
