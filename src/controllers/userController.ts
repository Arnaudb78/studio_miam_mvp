import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
};

const createUser = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { firstname, lastname, mail, password, rules, newsletter } = req.body;

    if (await User.findOne({ mail: mail })) return res.status(400).send({ message: "User already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        password: passwordHash,
        rules: rules,
        isNewsletter: newsletter,
    });
    const userId = { userId: user._id };
    const accessToken = jwt.sign(userId, "private_key", { expiresIn: "1h" });
    user.accessToken = accessToken;

    await user.save();

    res.status(201).json({ user, accessToken });
};

const loginUser = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail });
    if (!user) return res.status(404).send({ message: "User not found" });

    if (!(await bcrypt.compare(password, user.password!))) return res.status(409).send({ message: "Password is incorrect" });

    const userId = { userId: user._id };
    const accessToken = jwt.sign(userId, "private", { expiresIn: "1h" });
    user.accessToken = accessToken;

    await user.save();

    res.status(200).json({ user, accessToken });
};

const deleteUser = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "User cannot be empty" });

    const { mail } = req.body;
    const user = await User.findOne({ mail });
    if (!user) return res.status(403).send({ message: "User not found" });
    await User.findByIdAndDelete(user._id);
    res.status(204).send({ message: "User deleted" });
};

// const updateInformations = async (req: Request, res: Response) => {
//     if (!req.body) return res.status(400).send({ message: "User data cannot be empty" });

//     const { mail, firstname, name, isNewsletter } = req.body;

//     try {
//         const user = await User.findOne({ mail });
//         if (!user) return res.status(404).send({ message: "User not found" });

//         if (firstname) updateFirstname(user, firstname, res);
//         if (name) updateName(user, name, res);
//         if (mail) updateMail(user, mail, res);
//         if (isNewsletter !== undefined) updateIsNewsletter(user, isNewsletter, res);

//         await user.save();
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).send({ message: "Error updating user information", error });
//     }
// };

// async function updateFirstname(user: any, firstname: string, res: Response) {
//     if (!firstname) return res.status(400).send({ message: "Firstname cannot be empty" });
//     user.firstname = firstname;
// }

// async function updateName(user: any, name: string, res: Response) {
//     if (!name) return res.status(400).send({ message: "Name cannot be empty" });
//     user.name = name;
// }

// async function updateMail(user: any, mail: string, res: Response) {
//     if (!mail) return res.status(400).send({ message: "Mail cannot be empty" });
//     user.mail = mail;
// }

// async function updateIsNewsletter(user: any, isNewsletter: boolean, res: Response) {
//     user.isNewsletter = isNewsletter;
// }

export { getUsers, createUser, loginUser, deleteUser };
