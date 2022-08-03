import express from "express";
import videoController from "../controllers/video.js";
import verifyToken from "../middleware/verify.js";

const router = express.Router();

router.get("/random", videoController.getRandomVideo);
router.get("/trend", videoController.getTrendVideo);
router.get("/sub", verifyToken, videoController.subcribe);
router.get("/tags", videoController.getVideoByTags);
router.get("/search", videoController.search);
router.post("/", verifyToken, videoController.create);
router.put("/:id", verifyToken, videoController.update);
router.delete("/:id", verifyToken, videoController.delete);
router.get("/:id", videoController.getVideo);
router.put("/view/:id", videoController.addView);

export default router;
