import { Request, Response } from "express";
import NewsLetter from "../models/newsLetterModel";

const saveEmail = async (req: Request, res: Response) => {
    if (!req.body) return res.status(400).send({ message: "Email cannot be empty" });
    const email = req.body.email;
    if (await NewsLetter.findOne({ mail: email })) return res.status(409).send({ message: "Email already exists" });
    const newsLetter = new NewsLetter({
        mail: email,
    });
    await newsLetter.save();
    const response = await fetch('https://api.sendinblue.com/v3/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.BREVO_API_KEY!
        },
        body: JSON.stringify({
            email: email,
            listIds: [parseInt(process.env.LIST_ID!, 10)],
            updateEnabled: true
        })
    });
    
    const data = await response.json();
    
    console.log('Response from Sendinblue:', data);
    
    if (!data.code) {
        res.json({ message: 'Inscription réussie!' });
    } else {
        res.status(400).json({ message: 'Erreur: ' + data.message });
    }
    
    };

export { saveEmail };
