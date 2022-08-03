import Comment from "../models/comment.js";
import Video from "../models/video.js";

const commentController = {
    add: async (req, res) => {
        const newComment = new Comment({
            ...req.body,
            userId: req.user._id,
        });

        try {
            const savedComment = await newComment.save();
            return res.status(201).json(savedComment);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment)
                return res.status(404).json({ msg: 'Comment not found' });

            const video = await Video.findById({ _id: comment.videoId });
            if (req.user._id === comment.userId || req.user._id === video.userId) {
                await Comment.findByIdAndDelete(req.params.id);
                return res.status(200).json({ msg: "The comment has been deleted." });
            } else {
                return res.status(403).json({ msg: "Unauthorized." });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const comments = await Comment.find({ videoId: req.params.videoId });
            return res.status(200).json(comments);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

export default commentController;