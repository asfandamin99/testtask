import mongoose from "mongoose";
import { User } from "./user.js";
const { model, Schema } = mongoose
const { ObjectId } = Schema

const categories_schema = new Schema({
    name: { type: String, required: true },
    created_at: { type: Number, required: true },
})

export const Category = model("categories", categories_schema) 