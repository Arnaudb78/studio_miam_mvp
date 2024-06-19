import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
    mail: String,
});

export default mongoose.model("newsLetter", newsLetterSchema);
