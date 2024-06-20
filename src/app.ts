import express from "express";
import { Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import setupDBConnection from "./config/connection";
import newsLetterRouter from "./routes/newsLetterRouter";
import userRouter from "./routes/userRouter";
import appartRouter from "./routes/appartRouter";

dotenv.config();
setupDBConnection();

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json()); 

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend online");
});

app.use("/newsletter", newsLetterRouter);
app.use("/apparts", appartRouter);
app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.log("AAAAAA", err.message);
    res.status(500).json({ error: err.message });
    next();
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log("Server online !");
});

export default app;
