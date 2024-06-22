import { Router } from "express";
import { getArticles, createArticle, getArticleById } from "../controllers/articleController";


const router = Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);

export default router;
