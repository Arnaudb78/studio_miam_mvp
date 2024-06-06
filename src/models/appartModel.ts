import mongoose from "mongoose";

const appartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: String,
    description: String,
    price: Number,
    date: Date,
    localisation: String,
    hote: String,
    people_number: Number,
    room_number: Number,
    equipements:{
        wifi: Boolean,
        tv: Boolean,
        clim: Boolean,
        parking: Boolean,
        breakfast: Boolean,
    },
    accessories: {
        chain: Boolean,
        cage: Boolean,
        jacuzzi: Boolean,
    }
});

export default mongoose.model("apparts", appartSchema);