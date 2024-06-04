import { Router } from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", loginUser);
router.post("/create", createUser);

export default router;
