const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const Doctor = require("../models/doctor");

// Defining JWT secret key for token
const JWT_SECRET_KEY =
  "HospitalAPISecretKey,ItcanbeAnything,MakeSuretoPutTheSecretKeyHere";

//  JWT Strategy Options
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // extract bearer JWT token from header
  secretOrKey: JWT_SECRET_KEY,
};

// will run after JWT token extraction and fetch the user details
passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    Doctor.findById(jwtPayLoad._id, function (err, user) {
      if (err) {
        console.log("Error in finding user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
module.exports = JWT_SECRET_KEY;
