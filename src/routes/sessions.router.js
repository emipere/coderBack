import { Router } from 'express';
import passport from 'passport';
import userModel from '../models/user.model.js'
import { isValidPassword, generateJWToken } from '../path.js' /*creo que el utils es mi path*/

const router = Router();


router.post("/register", passport.authenticate(
    'register', { failureRedirect: '/api/sessions/fail-register' })
    , async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


    router.get("/fail-register", (req, res) => {
        res.status(401).send({ error: "Failed to process register!" });
    });


    router.post("/login", async (req, res) => {

        const { email, password } = req.body;

        try {

            const user = await userModel.findOne({ email: email });
            if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

            if (!isValidPassword(user, password)) {
                console.warn("Invalid credentials for user: " + email);
                return res.status(401).send({ status: "error", error: "Credenciales invalidas!!!" });
            }

            const tokenUser = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: user.role
            }

            const access_token = generateJWToken(tokenUser)
            console.log("access_token", access_token);

            res.cookie("jwtCookieToken", access_token, {
                maxAge: 60000,
                httpOnly: true,
            })
    
            res.send({ message: "Login successfull" })

        }catch (error){
            console.error(error);
            return res.status(500).send({ status: "error", error: "Error interno de la app." });

        }
    })