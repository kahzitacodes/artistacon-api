import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
   name: { type: String, required: true, trim: true },
   price: { type: Number, required: true },
   description: { type: String, required: true },
   url: { type: String },
   owner: { type: Types.ObjectId, ref: "User" }
});

export const ProductModel = model("Product", productSchema);