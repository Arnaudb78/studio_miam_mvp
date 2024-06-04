import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    mail: String,
    password: String,
    rules: Boolean,
    isNewsletter: Boolean,
    accessToken: String,
});

export default mongoose.model("users", userSchema);
