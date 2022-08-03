import Video from "../models/video.js";
import User from "../models/user.js";

const videoController = {
    create: async (req, res) => {
        const newVideo = new Video({
            userId: req.user._id,
            ...req.body,
        });
        try {
            const savedVideo = await newVideo.save();
            return res.status(201).json(savedVideo);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getVideo: async (req, res) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video)
                return res.status(404).json({ msg: "Video not found." });

            return res.status(200).json(video);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video)
                return res.status(404).json({ msg: "Video not found." });

            if (req.user._id === video.userId) {
                const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {
                    new: true,
                });
                return res.status(200).json(updatedVideo);
            } else {
                return res.status(403).json({ msg: "Unauthorized." });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const video = await Video.findById(req.params.id);
            if (!video)
                return res.status(404).json({ msg: "Video not found." });

            if (req.user._id === video.userId) {
                await Video.findByIdAndDelete(req.params.id);
                return res.status(200).json({ msg: "Video has been deleted." });
            } else {
                return res.status(403).json({ msg: "Unauthorized." });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    addView: async (req, res) => {
        try {
            await Video.findByIdAndUpdate(req.params.id, {
                $inc: { views: 1 },
            });
            return res.status(200).json({ msg: "The view has been increased." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getTrendVideo: async (req, res) => {
        try {
            const videos = await Video.find({}).sort({ views: -1 });
            return res.status(200).json(videos);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getRandomVideo: async (req, res) => {
        try {
            const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
            return res.status(200).json(videos);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    subcribe: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const subcribedChannels = user.subscribedUsers;

            const list = await Promise.all(
                subcribedChannels.map((channelId) => {
                    return Video.find({ userId: channelId });
                })
            );

            return res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getVideoByTags: async (req, res) => {
        const tags = req.query.tags.split(",");
        try {
            const videos = await Video.find({ tags: { $in: tags } }).limit(20);
            return res.status(200).json(videos);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    search: async (req, res) => {
        const query = req.query.q;
        try {
            const videos = await Video.find({
                title: { $regex: query, $options: "i" },
            }).limit(40);
            return res.status(200).json(videos);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

export default videoController;