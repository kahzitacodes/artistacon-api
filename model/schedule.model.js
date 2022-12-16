import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
   image: { type: String, required: true, default: "https://res.cloudinary.com/dpxfwxwfu/image/upload/v1670971311/default-imgs/product__img_default_yrdhct.png" },
   title: { type: String, required: true, trim: true },
   participants: { type: String, required: true },
   date: { type: String, required: true },
   time: { type: String, required: true },
   status: { type: String, enum: ["Confirmado", "Pendente", "Cancelado"], default: "Confirmado" }
});

export const ScheduleModel = model("Schedule", scheduleSchema);