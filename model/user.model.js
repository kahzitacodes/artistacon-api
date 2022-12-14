import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["ADMIN", "USER", "ARTIST"], default: "USER" },
  createdAt: { type: Date, default: Date.now() },
  products: [{ type: Types.ObjectId, ref: "Product" }],
  favorites: [{ type: Types.ObjectId, ref: "Product" }],
  bio: { type: Types.ObjectId, ref: "Bio" }
});

export const UserModel = model("User", userSchema);
