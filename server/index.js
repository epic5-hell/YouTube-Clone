import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const connect = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            throw err;
        });
};

app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
router(app);

app.listen(port, () => {
    connect();
    console.log('Server is running on port 8800');
});