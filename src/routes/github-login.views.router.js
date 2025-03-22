import { Router } from "express";

const router = Router();


router.get('/login', (req, res) => {
    res.render('github-login')
})


export default router;