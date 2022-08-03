import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import videoRoutes from "./videos.js";
import commentRoutes from "./comments.js";

function router(app) {
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/videos", videoRoutes);
    app.use("/api/comments", commentRoutes);
}

export default router;