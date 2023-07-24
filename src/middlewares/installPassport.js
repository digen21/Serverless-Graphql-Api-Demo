const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const UserModel = require("../models/UserModel");

const { JWT_TOKEN } = process.env;

const options = {
  secretOrKey: JWT_TOKEN,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const installPassport = (app) => {
  try {
    passport.use(
      new Strategy(options, async (payload, done) => {
        if (!payload) {
          return done(null, false);
        }
        const userId = payload.user_id;
        const user = await UserModel.findById(userId);
        return done(null, user || false);
      })
    );

    passport.serializeUser((user, done) => {
      return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      const user = await UserModel.findById(id);
      return done(null, user);
    });

    const handleJwt = (req, res, next) => {
      const token = options.jwtFromRequest(req);
      if (token) {
        passport.authenticate("jwt", { session: false })(req, res, next);
      } else {
        next();
      }
    };

    app.use(handleJwt);
    app.use(passport.initialize());
    app.use(passport.session());
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = installPassport;
