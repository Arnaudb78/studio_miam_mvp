import { Router } from "express";
import { saveEmail } from "../controllers/newsLetterController";

const router = Router();

router.post("/", saveEmail);

export default router;
