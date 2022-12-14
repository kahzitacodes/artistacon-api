import express from "express";
import { ProductModel } from "../model/product.model.js";
import { UserModel } from "../model/user.model.js";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res) => {
   try {

      const artistUsers = await UserModel.find({ role: "ARTIST" }, { email: 0, favorites: 0, passwordHash: 0 }).populate("bio");

      return res.status(200).json(artistUsers);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

artistsRouter.get("/:artistId", async (req, res) => {
   try {

      const artist = await UserModel.findOne(
         { _id: req.params.artistId },
         { favorites: 0, passwordHash: 0 }
      ).populate("bio");

      return res.status(200).json(artist);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

artistsRouter.get("/:artistId/products", async (req, res) => {
   try {

      const products = await ProductModel.find({ owner: req.params.artistId });

      return res.status(200).json(products);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

artistsRouter.get("/:artistId/products/:productId", async (req, res) => {
   try {

      const product = await ProductModel.findOne({ _id: req.params.productId });

      return res.status(200).json(product);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});


export { artistsRouter };