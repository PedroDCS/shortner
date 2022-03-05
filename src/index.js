import express from "express";
import userRouter from "./router/userRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});