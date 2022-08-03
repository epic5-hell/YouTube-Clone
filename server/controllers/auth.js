import User from "../models/user.js";
import bcrypt from "bcrypt";

const authController = {
    signUp: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email });
            if (user)
                return res.status(400).json({ message: 'User already exists' });

            const newUser = new User({ name, email, password });
            await newUser.save();
            return res.status(201).json({ msg: 'User created', newUser });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    signIn: async (req, res) => {
        try {
            const { name, password } = req.body;
            const user = await User.findOne({ name });
            if (!user)
                return res.status(404).json({ msg: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: 'Invalid credentials' });

            const token = await user.generateAuthToken();
            return res.cookie("access_token", token, {
                httpOnly: true,
            })
                .status(200)
                .json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    google: async (req, res) => {
        try {
            const { name, email } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                const token = await user.generateAuthToken();
                return res.cookie("access_token", token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json(user);
            } else {
                const newUser = new User({
                    ...req.body,
                    fromGoogle: true,
                });
                const savedUser = await newUser.save();
                const token = await savedUser.generateAuthToken();
                return res.cookie("access_token", token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json(savedUser);
            }
        } catch (err) {

        }
    }
}

export default authController;