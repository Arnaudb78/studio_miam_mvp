import { Request, Response } from "express";
import NewsLetter from "../models/newsLetterModel";

const saveEmail = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Email cannot be empty" });
    const email = req.body.email;
    if (await NewsLetter.findOne({ mail: email })) return res.status(400).send({ message: "Email already exists" });
    const newsLetter = new NewsLetter({
        mail: email,
    });
    await newsLetter.save();
    res.status(201).json(newsLetter);
};

export { saveEmail };
