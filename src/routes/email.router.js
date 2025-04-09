import { Router } from "express";
import { sendEmail, sendEmailWitchAttachments } from "../controllers/email.controllers.js";

const router = Router();

router.get("/", sendEmail);
router.get("/attachments", sendEmailWitchAttachments);

export default router;