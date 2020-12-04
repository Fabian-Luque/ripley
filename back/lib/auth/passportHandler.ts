import passport from "passport";
import passportJwt from "passport-jwt";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;



passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  }, function (jwtToken, done) {
    User.findOne({ email: jwtToken.email.toLowerCase() }, function (err, user) {
      if (err) { return done(err, false); }
      if (user) {
        return done(undefined, user, jwtToken);
      } else {
        return done(undefined, false);
      }
    });
}));


