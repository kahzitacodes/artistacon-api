import express from "express";
import { UserModel } from "../model/user.model.js";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res) => {
   try {

      const artistUsers = await UserModel.find({ role: "ARTIST" }, { favorites: 0, passwordHash: 0 }).populate("bio");

      return res.status(200).json(artistUsers);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

artistsRouter.get("/:userId", async (req, res) => {
   try {

      const user = await UserModel.findOne(
         { _id: req.params.userId },
         { favorites: 0, passwordHash: 0 }
      ).populate("bio");

      return res.status(200).json(user);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
}
);

export { artistsRouter };