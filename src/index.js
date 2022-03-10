import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./router/userRouter.js";

mongoose.connect("mongodb://localhost:27017/pitang-trainee-backend1")
    .then(() => {
        console.log("Database Connected...");
    }).catch((error) => {
        console.log(error);
    })

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(morgan("dev"))

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});