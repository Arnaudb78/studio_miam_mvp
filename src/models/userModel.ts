import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    mail: String,
    password: String,
    isNewsletter: Boolean,
    accessToken: String,
});

export default mongoose.model("users", userSchema);
