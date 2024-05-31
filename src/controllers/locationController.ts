import { Request, Response } from "express";
import Location from "../models/locationModel";

const getAllLocations = async (req: Request, res: Response) => {
    const locations = await Location.find();
    res.status(200).json(locations);
}

export { getAllLocations };