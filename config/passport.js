const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const db = require("../db/");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      db.query(
        "SELECT * FROM users WHERE id=$1",
        [jwt_payload.id],
        (err, res) => {
          if (err) throw err;

          if (res.rows.length > 0) {
            const user = res.rows[0];
            // Return the user to the frontend
            return done(null, user);
          }
          // Return false since there is no user
          return done(null, user);
        }
      );
    })
  );
};
