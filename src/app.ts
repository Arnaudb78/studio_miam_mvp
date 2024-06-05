import express from "express";
import { Request, Response } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import setupDBConnection from "./config/connection";
import userRouter from "./routes/userRouter";
import locationRouter from "./routes/locationRouter";

dotenv.config();
setupDBConnection();

const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend online");
});

app.use("/locations", locationRouter);
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
