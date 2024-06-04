import { Router } from "express";
import { createLocation, getAllLocations } from "../controllers/locationController";

const router = Router();

router.get("/", getAllLocations);

router.post("/", createLocation);

export default router;
