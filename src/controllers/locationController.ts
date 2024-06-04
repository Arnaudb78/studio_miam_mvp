import { Request, Response } from "express";
import Location from "../models/locationModel";

const getAllLocations = async (req: Request, res: Response) => {
    const locations = await Location.find();
    res.status(200).json(locations);
};

const createLocation = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Location cannot be empty" });
    const location = new Location({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: req.body.date,
        localisation: req.body.localisation,
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
    await location.save();
    res.status(201).json(location);
};

export { getAllLocations, createLocation };
