import User from "../models/user.js";
import Video from "../models/video.js";

const userController = {
    get: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    update: async (req, res) => {
        if (req.params.id === req.user._id) {
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {
                    new: true
                });
                return res.status(200).json(updatedUser);
            } catch (err) {
                return res.status(500).json({ msg: err.message });
            }
        } else {
            return res.status(403).json({ msg: 'Unauthorized.' });
        }
    },
    delete: async (req, res) => {
        if (req.params.id === req.user._id) {
            try {
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json({ msg: "User has been deleted." });
            } catch (err) {
                return res.status(500).json({ msg: err.message });
            }
        } else {
            return res.status(403).json({ msg: 'Unauthorized.' });
        }
    },
    subcribe: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $addToSet: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: 1 },
            });
            return res.status(200).json({ msg: "Subcribe successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    unsubcribe: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { subscribedUsers: req.params.id },
            });
            await User.findByIdAndUpdate(req.params.id, {
                $inc: { subscribers: -1 },
            });
            return res.status(200).json({ msg: "Unsubcribe successfully!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    like: async (req, res) => {
        const id = req.user._id;
        const videoId = req.params.videoId;
        try {
            await Video.findByIdAndUpdate(videoId, {
                $addToSet: { likes: id },
                $pull: { dislikes: id },
            });
            return res.status(200).json({ msg: "The video has been liked." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    dislike: async (req, res) => {
        const id = req.user._id;
        const videoId = req.params.videoId;
        try {
            await Video.findByIdAndUpdate(videoId, {
                $addToSet: { dislikes: id },
                $pull: { likes: id },
            });
            return res.status(200).json({ msg: "The video has been disliked." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

export default userController;