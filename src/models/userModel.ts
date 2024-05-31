import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
});

export default mongoose.model("users", userSchema);
