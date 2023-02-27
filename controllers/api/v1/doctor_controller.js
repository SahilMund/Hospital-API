const Doctor = require("../../../models/doctor");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../../../config/passport-jwt-strategy");

//Register the doctor in the db by using name,email and password
module.exports.register = async function (req, res) {
  const { email, name, password, username } = req.body;

  //Check if any field is missed, then throw them error message
  if (!email || !name || !password || !username) {
    return res.status(206).json({
      message:
        "email,name,username and password fields should not be empty.",
      success: false,
    });
  }

  //Check if the doctor is already registered in , give them the same resp with the existing data
  let existingDoctorByEmail = await Doctor.findOne({ email: email });
  let existingDoctorByUserName = await Doctor.findOne({ username: username });

  if (existingDoctorByEmail || existingDoctorByUserName) {
    // existingDoctorByEmail = await existingDoctorByEmail;

    let { name, email , username } = existingDoctorByEmail || existingDoctorByUserName;
    return res.status(405).json({
      data: {
        doctor: { name, email , username},
      },
      message: "Doctor already registered, Kindly proceed for Login",
      success: false,
    });
  }

  try {
    //  If the above checks are done, then we are good to register the user, lets create the user
    let newDoctor = await Doctor.create(req.body);
    if (newDoctor) {
      let { name, email , username } = newDoctor;

      return res.status(200).json({
        data: {
          doctor: { name, email , username },
        },
        message: "Successfully registered, Proceed for LogIn",
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

//Login for Doctor using email and password, generate JWT token for doc
module.exports.login = async function (req, res) {
  const { username, password } = req.body;

  // Check if anyone from the username or password is missing
  if (!username || !password) {
    return res.status(206).json({
      message:
        "Username / Password should not be empty",
      success: false,
    });
  }

  try {
    let doctor = await Doctor.findOne({ username: username });

    let enteredPassword =  req.body.password;
    let password = doctor ? doctor.password : '';

    //  check whether the entered email and password is matching or with the user's mail
    if (!doctor || enteredPassword !== password) {
      return res.status(401).json({
        message: "Invalid Username / Password",
        success: false,
      });
    }

    //  As all the above checks are done, we can create a new user and let them login 
    return res.status(200).json({
      data: {
        //  creating a jwt token with the doctor data as payload
        token: jwt.sign(doctor.toJSON(), JWT_SECRET_KEY, {
          expiresIn: 1000000,
        }),
        message: "Hurray !! Logged In Successfully......",
        success: true,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went Wrong",
      success: false,
    });
  }
};
