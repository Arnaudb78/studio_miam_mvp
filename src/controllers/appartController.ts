import { Request, Response } from "express";
import Appart from "../models/appartModel";
import User from "../models/userModel";
import mongoose from "mongoose";

const getAllApparts = async (req: Request, res: Response) => {
    const apparts = await Appart.find();
    if(!apparts) return res.status(404).send("No appart found");
    res.status(200).json(apparts);
};

const getAppartByUser = async (req: Request, res: Response) => {
    const user = req.body;
    const userId = user._id;
    if (!userId) return res.status(400).send({ message: "User id is required" });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid user id format" });
    }

    try {
        const objectId = new mongoose.Types.ObjectId(userId);

        const userExists = await User.findById(objectId);
        if (!userExists) {
            return res.status(404).send({ message: "User not found" });
        }

        const apparts = await Appart.find({ user_id: objectId });
        if (!apparts || apparts.length === 0) {
            return res.status(404).send({ message: "No appart found" });
        }

        res.status(200).json(apparts);
    } catch (error) {
        console.error(`Error converting user id: ${error}`);
        res.status(500).send({ message: "Server error" });
    }
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
    console.log(req.body); 
    if (!req.body) return res.status(400).send({ message: "appart cannot be empty" });

    const { appart, mail } = req.body;
    const { localisation, equipements, accessories, images } = appart;
    const user = await User.findOne({ mail });
    if (!user) return res.status(404).send({ message: "User not found" });
    const newAppart = new Appart({
        user_id: user._id,
        title: appart.title,
        description: appart.description,
        price: appart.price,
        time: appart.time,
        localisation: {
            address: localisation.address,
            complementary_address: localisation.complementary_address,
            city: localisation.city,
            zip_code: localisation.zip_code,
            country: localisation.country,
        },
        hote: `${user.firstname} ${user.lastname}`,
        people_number: appart.people_number,
        type: appart.type,
        room_number: appart.room_number,
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
        images: images,
    });

    try {
        const savedAppart = await newAppart.save();
        res.status(201).json(savedAppart);
    } catch (error) {
        res.status(500).send({ message: "Error saving appart", error });
    }
};

export { getAllApparts, getAppartByUser, createAppart, getAppartById };
