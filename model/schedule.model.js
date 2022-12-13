import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
   title: { type: String, required: true, trim: true },
   participants: { type: String, required: true },
   date: { type: Date, required: true },
   time: { type: Date, required: true },
   status: { type: String, enum: ["Confirmado", "Cancelado"], default: "Confirmado" }
});

export const ScheduleModel = model("Schedule", scheduleSchema);