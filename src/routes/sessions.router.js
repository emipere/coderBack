import { Router } from "express";
import passport from "passport";
import {
  githubCallback,
  registerUser,
  failRegister,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/sessions.controller.js";

const userRouter = Router();


userRouter.get("/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {} 
);


userRouter.get("/githubcallback",
  passport.authenticate("github", { failureRedirect: "/github/error" }),
  githubCallback
);


userRouter.post( "/register",
  passport.authenticate("register", { failureRedirect: "/api/sessions/fail-register" }),
  registerUser
);


userRouter.get("/fail-register", failRegister);


userRouter.post("/login", loginUser);


userRouter.get("/logout", logoutUser);


userRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  getCurrentUser
);

export default userRouter;
