import mongoose from "mongoose";
const { model, Schema } = mongoose
const { ObjectId } = Schema
import {Category} from './categories.js'



const car_schema = new Schema({
    make: { type: String, required: true },
    model: String,
    color: String,
    reg_no: { type: String, required: true },
    category: { type: ObjectId, required: true, ref: Category },
    created_at: { type: Number, required: true }
})

export const Car = model("car", car_schema)