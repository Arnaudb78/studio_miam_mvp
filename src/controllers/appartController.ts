import { Request, Response } from "express";
import Appart from "../models/appartModel";

const getAllApparts = async (req: Request, res: Response) => {
    const apparts = await Appart.find();
    res.status(200).json(apparts);
};

const getAppartByUser = async (req: Request, res: Response) => {
    const userId = req.query.user_id;
    if(!userId) return res.status(400).send({ message: "User id is required" });
    const apparts = await Appart.find({ user_id: userId });
    if(!apparts) return res.status(404).send({ message: "No appart found" });
    res.status(200).json(apparts);
}

const createAppart = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "appart cannot be empty" });
    const appart = new Appart({
        user_id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        time: req.body.time,
        localisation: {
            address: req.body.localisation.address,
            complementary_address: req.body.localisation.complementary_address,
            city: req.body.localisation.city,
            zip_code: req.body.localisation.zip_code,
            country: req.body.localisation.country,
        
        },
        hote: req.body.hote,
        people_number: req.body.people_number,
        room_number: req.body.room_number,
        equipements: {
            wifi: req.body.equipements.wifi,
            tv: req.body.equipements.tv,
            clim: req.body.equipements.clim,
            parking: req.body.equipements.parking,
            breakfast: req.body.equipements.breakfast,
        },
        accessories: {
            chain: req.body.accessories.chain,
            cage: req.body.accessories.cage,
            jacuzzi: req.body.accessories.jacuzzi,
        },
    });
    await appart.save();
    res.status(201).json(appart);
};

export { getAllApparts, getAppartByUser, createAppart };
