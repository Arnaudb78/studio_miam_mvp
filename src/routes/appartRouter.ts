import { Router } from "express";
import { getAllApparts, getAppartByUser, createAppart } from "../controllers/appartController";

const router = Router();

router.get("/", getAllApparts);
router.get("/getAppart", getAppartByUser)

router.post("/", createAppart);

export default router;
