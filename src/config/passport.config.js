import passport from "passport";
import jwtStrategy from "passport-jwt";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../services/dao/mongo/models/user.model.js";
import cartModel from "../services/dao/mongo/models/cart.model.js";
import { createHash, PRIVATE_KEY, cookieExtractor } from "../path.js";

const localStrategy = passportLocal.Strategy;
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv23lihB1mJSqLPVzeiH",
        clientSecret: "8dd8ea9413fb534c7b75b86ffe3b090478d1d670",
        callbackUrl: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({ email: profile._json.email });

          if (!user) {
            const cart = await cartModel.create({ products: [] });

            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 45,
              email: profile._json.email,
              password: "",
              cart: cart._id,
            };
            const result = await userModel.create(newUser);
            user = result;
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const exists = await userModel.findOne({ email: username });
          if (exists) {
            return done(null, false);
          }
          const cart = await cartModel.create({ products: [] });
          const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cart._id,
          };
          const result = await userModel.create(user);

          return done(null, result);
        } catch (error) {
          return done("Error registrando el usuario: " + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });

  passport.use(
    "current",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
