import express from "express";
import commentController from "../controllers/comment.js";
import verifyToken from "../middleware/verify.js";

const router = express.Router();

router.post("/", verifyToken, commentController.add);
router.delete("/:id", verifyToken, commentController.delete);
router.get("/:videoId", commentController.getAll);


export default router;