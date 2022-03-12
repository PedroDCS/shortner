import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./router/userRouter.js";
import { AuthMiddleware } from "./middleware/auth.middleware.js";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("Database Connected...");
    }).catch((error) => {
        console.log(error);
    })

const app = express();

app.use(express.json());

app.use(morgan("dev"))

app.use(AuthMiddleware);

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});