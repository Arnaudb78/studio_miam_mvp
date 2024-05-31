import { Router } from "express";
import { createdUser, getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/",createdUser);

export default router;