import { Request, Response } from "express";
import Appart from "../models/appartModel";
import User from "../models/userModel";
import mongoose from "mongoose";

const getAllApparts = async (req: Request, res: Response) => {
    const apparts = await Appart.find();
    res.status(200).json(apparts);
};

const getAppartByUser = async (req: Request, res: Response) => {
    const userId = req.query.user_id;
    if (!userId) return res.status(400).send({ message: "User id is required" });
    const apparts = await Appart.find({ user_id: userId });
    if (!apparts) return res.status(404).send({ message: "No appart found" });
    res.status(200).json(apparts);
};

const getAppartById = async (req: Request, res: Response) => {
    if (!req.params.id) return res.status(400).send({ message: "Appart id is required" });
    const { id } = req.params;
    const appart = await Appart.findById(id);
    if (appart) {
        res.json(appart);
    } else {
        res.status(404).send("Appartement not found");
    }
};

const createAppart = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "appart cannot be empty" });
    const localisation = req.body.appart.localisation;
    const equipements = req.body.appart.equipements;
    const accessories = req.body.appart.accessories;
    const user = await User.findOne({ mail: req.body.mail });
    if (!user) return res.status(404).send({ message: "User not found" });
    const appart = new Appart({
        user_id: user._id,
        title: req.body.appart.title,
        description: req.body.appart.description,
        price: req.body.appart.price,
        time: req.body.appart.time,
        localisation: {
            address: localisation.address,
            complementary_address: localisation.complementary_address,
            city: localisation.city,
            zip_code: localisation.zip_code,
            country: localisation.country,
        },
        hote: user.firstname + " " + user.lastname,
        people_number: req.body.appart.people_number,
        type: req.body.appart.type,
        room_number: req.body.appart.room_number,
        equipements: {
            wifi: equipements.wifi,
            tv: equipements.tv,
            clim: equipements.clim,
            parking: equipements.parking,
            breakfast: equipements.breakfast,
        },
        accessories: {
            chain: accessories.chain,
            cage: accessories.cage,
            jacuzzi: accessories.jacuzzi,
        },
    });
    await appart.save();
    res.status(201).json(appart);
};

export { getAllApparts, getAppartByUser, createAppart, getAppartById };
