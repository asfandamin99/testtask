import mongoose from "mongoose";
const { model, Schema } = mongoose
const { ObjectId } = Schema



const user_schema = new Schema({
    password: { type: String, required: true },
    name: String,
    email: String,
    contact: { type: String, required: true },
    created_at: { type: Number, required: true }
})

export const User = model("users", user_schema)