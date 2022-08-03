import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        image: {
            type: String,
        },
        subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [String],
        },
        fromGoogle: {
            type: Boolean,
            default: false,
        }
    }, { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.password) {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8);
        }
    }
    next();
}
);

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ user }, process.env.JWT_KEY);
    return token;
};

export default mongoose.model("User", UserSchema);