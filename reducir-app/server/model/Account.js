import mongoose from "mongoose";

const Schema = mongoose.Schema;
const actionSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: Array,
    },
    category: {
        type: String
    },
    carbon: {
        type: Number
    },
    points: {
        type: Number
    },
    points: {
        type: Number
    },
    image: {
        type: String
    },
    alt: {
        type: String
    },
}, { timestamps: true });

const accountSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String
    },
    carbon: {
        type: Number
    },
    favorites: {
        type: [actionSchema]
    },
    achievements: {
        type: [actionSchema]
    },
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);
export default Account;