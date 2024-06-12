import { Router } from "express";
import { getAllApparts, getAppartByUser, createAppart, getAppartById } from "../controllers/appartController";

const router = Router();

router.get("/", getAllApparts);
router.get("/:id", getAppartById);
router.post("/userAppart", getAppartByUser);

router.post("/", createAppart);

export default router;
