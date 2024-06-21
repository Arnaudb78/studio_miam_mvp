import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author: String,
    date: Date
});

export default mongoose.model("articles", articleSchema);
