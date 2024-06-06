import { Router } from "express";
import { createUser, deleteUser, getUsers, loginUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", loginUser);
router.post("/create", createUser);
router.delete("/delete", deleteUser);

export default router;
