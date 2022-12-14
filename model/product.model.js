import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
   image: { type: String, required: true, default: "https://res.cloudinary.com/dpxfwxwfu/image/upload/v1670971311/default-imgs/product__img_default_yrdhct.png" },
   name: { type: String, required: true, trim: true },
   price: { type: Number, required: true },
   description: { type: String, required: true },
   url: { type: String },
   owner: { type: Types.ObjectId, ref: "User" }
});

export const ProductModel = model("Product", productSchema);