import express from 'express';
import userController from '../controllers/user.js';
import verifyToken from '../middleware/verify.js';

const router = express.Router();

router.get("/:id", userController.get);
router.put("/:id", verifyToken, userController.update);
router.delete("/:id", verifyToken, userController.delete);
router.put("/sub/:id", verifyToken, userController.subcribe);
router.put("/unsub/:id", verifyToken, userController.unsubcribe);
router.put("/like/:videoId", verifyToken, userController.like);
router.put("/dislike/:videoId", verifyToken, userController.dislike);

export default router;