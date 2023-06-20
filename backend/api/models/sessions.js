import mongoose from "mongoose";
import { User } from "./user.js";
const { model, Schema } = mongoose
const { ObjectId } = Schema

const sessions_schema = new Schema({
    user_id: { type: ObjectId, required: true, ref: User, index: true },
    token: { type: String, required: true },
    created_at: { type: Number, required: true },
})

export const Session = model("sessions", sessions_schema) 