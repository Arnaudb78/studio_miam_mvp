import { Request, Response } from "express";
import Article from "../models/articleModel";

const getArticles = async (req: Request, res: Response) => {
    const users = await Article.find();
    res.status(200).json(users);
};

const createArticle = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Article cannot be empty" });
    const { title, description, content, author } = req.body;
    const date = new Date();

    const article = new Article({
        title: title,
        description: description,
        content: content,
        author: author,
        date: date
    })

    await article.save();

    res.status(201).json({ article });
};


export {getArticles, createArticle};