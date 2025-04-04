

import { Router } from "express";
import { passportCall, authorization } from "../path.js";
import {LoginView,RegisterView,ProfileView,AdminDashboardView} from "../controllers/users.views.controller.js";

const router = Router();

router.get("/login", LoginView);

router.get("/register", RegisterView);

router.get("/", passportCall("jwt"), ProfileView);

router.get("/dashboard-admin",
    passportCall("jwt"),
    authorization("admin"),
    AdminDashboardView
);

export default router;
