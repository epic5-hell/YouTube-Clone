import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token)
            return res.status(403).json({ msg: "No token provided." });

        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if (err) return res.status(500).json({ msg: err });
            req.user = data.user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

export default verifyToken;