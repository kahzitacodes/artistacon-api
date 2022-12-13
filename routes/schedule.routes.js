import express from "express";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { ScheduleModel } from "../model/schedule.model.js";

const scheduleRouter = express.Router();

scheduleRouter.post("/new-activity", isAuth, attachCurrentUser, isAdmin, async (req, res) => {
   try {

      const newActivity = await ScheduleModel.create({ ...req.body });

      return res.status(201).json(newActivity);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

scheduleRouter.get("/", async (req, res) => {
   try {

      const completeSchedule = await ScheduleModel.find({});

      return res.status(200).json(completeSchedule);

   } catch (error) {
      console.log(error);
      return res.status(500);
   }
});

scheduleRouter.put("/:activityId", isAuth, attachCurrentUser, isAdmin, async (req, res) => {
   try {

      const updatedActivity = await ScheduleModel.findOneAndUpdate(
         { _id: req.params.activityId },
         { ...req.body },
         { new: true, runValidators: true }
      );

      return res.status(200).json(updatedActivity);

   } catch (error) {
      console.log(500);
      return res.status(500).json(error);
   }
});

scheduleRouter.delete("/:activityId", isAuth, attachCurrentUser, isAdmin, async (req, res) => {
   try {

      await ScheduleModel.findOneAndDelete({ _id: req.params.activityId });

      return res.status(200).json({ msg: "Atividade deletada com sucesso" });

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

export { scheduleRouter };
