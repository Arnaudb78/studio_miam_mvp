import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
};

const createUser = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { firstname, lastname, mail, password, confirmPassword, newsletter } = req.body;
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        password: password,
        confirmPassword: confirmPassword,
        isNewsletter: newsletter,
    });
    const userId = { userId: user._id };
    const accessToken = jwt.sign(userId, "private_key", { expiresIn: "1h" });
    user.accessToken = accessToken;

    await user.save();

    res.status(201).json({ user, accessToken });
};

const loginUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail, password: password });
    if (!user) return res.status(404).send({ message: "User not found" });
    const userId = { userId: user._id };
    const accessToken = jwt.sign(userId, "private", { expiresIn: "1h" });
    user.accessToken = accessToken;
    await user.save();
    res.status(200).json({ user, accessToken });
};

export { getUsers, createUser, loginUser };
