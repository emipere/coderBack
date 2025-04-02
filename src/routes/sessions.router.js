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

// Ruta para autenticación con GitHub
userRouter.get("/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {} // No hace nada aquí, Passport redirige
);

// Ruta para el callback de GitHub
userRouter.get("/githubcallback",
  passport.authenticate("github", { failureRedirect: "/github/error" }),
  githubCallback
);

// Ruta para registrar un usuario
userRouter.post( "/register",
  passport.authenticate("register", { failureRedirect: "/api/sessions/fail-register" }),
  registerUser
);

// Ruta para fallo en registro
userRouter.get("/fail-register", failRegister);

// Ruta para login
userRouter.post("/login", loginUser);

// Ruta para logout
userRouter.get("/logout", logoutUser);

// Ruta para obtener el usuario actual
userRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  getCurrentUser
);

export default userRouter;
