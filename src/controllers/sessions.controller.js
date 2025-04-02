import { Router} from "express";
import passport from "passport";
import userModel from "../models/user.model.js";
import { isValidPassword, generateJWToken } from "../path.js";

const router = Router();

router.get( "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

// router.get("/githubcallback",
//   passport.authenticate("github", { failureRedirect: "/github/error" }),
//   async (req, res) => {
//     const user = req.user;
//     const tokenUser = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       cart: user.cart,
//       role: user.role,
//     };
//     const access_token = generateJWToken(tokenUser);

//     res.cookie("jwtCookieToken", access_token, {
//       maxAge: 60000,
//       httpOnly: true,
//     });

//     res.redirect("/users");
//   }
// );
export const githubCallback =   
async (req, res) => {
  try {
    const user = req.user;
    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      cart: user.cart,
      role: user.role,
    };
    const access_token = generateJWToken(tokenUser);

    res.cookie("jwtCookieToken", access_token, {
      maxAge: 60000,
      httpOnly: true,
    });

    res.redirect("/users");
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error en GitHub callback" });
  }
};
// router.post("/register",
//   passport.authenticate("register", {
//     failureRedirect: "/api/sessions/fail-register",
//   }),
//   async (req, res) => {
//     // console.log("Registrando nuevo usuario.");
//     res
//       .status(201)
//       .send({ status: "success", message: "Usuario creado con extito." });
//   }
// );
export const registerUser =  
async (req, res) => {
  try {
    res
      .status(201)
      .send({ status: "success", message: "Usuario creado con éxito." });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Error al registrar usuario" });
  }
};
// router.get("/fail-register", (req, res) => {
//   res.status(401).send({ error: "Failed to process register!" });
// });
export const failRegister = (req, res) => {
  res.status(401).send({ error: "Failed to process register!" });
};

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await userModel.findOne({ email: email });
//     if (!user)
//       return res.status(401).json({ message: "Usuario no encontrado" });

//     if (!isValidPassword(user, password)) {
//       // console.warn("Invalid credentials for user: " + email);
//       return res
//         .status(401)
//         .send({ status: "error", error: "Credenciales invalidas!!!" });
//     }

//     const tokenUser = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       role: user.role,
//       isAdmin: user.role === "admin",
//     };

//     const access_token = generateJWToken(tokenUser);
//     // console.log("access_token", access_token);

//     res.cookie("jwtCookieToken", access_token, {
//       maxAge: 60000,
//       httpOnly: true,
//     });

//     res.send({ message: "Login successfull" });
//   } catch (error) {
//     // console.error(error);
//     return res
//       .status(500)
//       .send({ status: "error", error: "Error interno de la app." });
//   }
// });
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (!isValidPassword(user, password)) {
      return res
        .status(401)
        .send({ status: "error", error: "Credenciales inválidas!!!" });
    }

    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      isAdmin: user.role === "admin",
    };

    const access_token = generateJWToken(tokenUser);

    res.cookie("jwtCookieToken", access_token, {
      maxAge: 60000,
      httpOnly: true,
    });

    res.send({ message: "Login successful" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "Error interno de la app." });
  }
};
// router.get("/logout", (req, res) => {
//   res.clearCookie("jwtCookieToken");
//   res.redirect("/users/login");
// });
export const logoutUser = (req, res) => {
  res.clearCookie("jwtCookieToken");
  res.redirect("/users/login");
};
// router.get("/current",
//   passport.authenticate("current", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }

export const getCurrentUser =  
(req, res) => {
  res.send(req.user);
};








