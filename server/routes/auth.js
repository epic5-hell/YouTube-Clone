import express from 'express';
import authController from '../controllers/auth.js';

const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/google", authController.google);

export default router;