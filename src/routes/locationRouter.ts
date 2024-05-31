import { Router } from "express";
import { getAllLocations } from "../controllers/locationController";

const router = Router();

router.get("/", getAllLocations);

export default router;