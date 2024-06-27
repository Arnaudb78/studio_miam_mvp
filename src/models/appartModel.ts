import mongoose from "mongoose";

const appartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: String,
    description: String,
    price: Number,
    time: [{ type: String, enum: ["10-12", "12-14", "14-16", "16-18", "18-20", "20-22"] }],
    localisation: {
        address: String,
        complementary_address: String,
        city: String,
        zip_code: Number,
        country: String,
    },
    hote: String,
    people_number: Number,
    type: String,
    room_number: Number,
    equipements: {
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
    },
    images: [String],
});

export default mongoose.model("apparts", appartSchema);
