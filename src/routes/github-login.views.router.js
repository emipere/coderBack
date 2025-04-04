import { Router } from "express";
import { renderGithubLogin } from "../controllers/github-login.views.controllers.js";

const router = Router();

router.get('/login', renderGithubLogin);

export default router;