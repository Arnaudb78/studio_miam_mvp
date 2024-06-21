import { Router } from "express";
import { getArticles, createArticle } from "../controllers/articleController";


const router = Router();

router.get("/", getArticles);
router.post("/", createArticle);

export default router;
