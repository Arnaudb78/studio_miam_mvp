import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, loginUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", loginUser);
router.post("/create", createUser);
router.delete("/delete", deleteUser);
// router.put("/update", updateInformations);

export default router;
