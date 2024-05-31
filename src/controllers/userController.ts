import { Request, Response } from "express";
import User from "../models/userModel";

const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
}

const createdUser = async(req: Request, res: Response) => {
    const { name, mail } = req.body;
    const user = new User({
        name: req.body.name,
        mail: req.body.mail,
    });

    await user.save();

    res.status(201).json(user);
}

export { getUsers, createdUser};