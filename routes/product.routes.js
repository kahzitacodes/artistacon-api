import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isArtist } from "../middlewares/isArtist.js";
import isAuth from "../middlewares/isAuth.js";
import { ProductModel } from "../model/product.model.js";
import { UserModel } from "../model/user.model.js";

const productRouter = express();

productRouter.post("/new-product", isAuth, attachCurrentUser, isArtist, async (req, res) => {
   try {

      const loggedUser = req.currentUser;
      const newProduct = await ProductModel.create({
         ...req.body,
         owner: loggedUser._id
      });

      await UserModel.findOneAndUpdate(
         { _id: loggedUser._id },
         { $push: { products: newProduct._doc._id } },
         { runValidators: true }
      );

      return res.status(201).json(newProduct);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

productRouter.get("/", isAuth, attachCurrentUser, isArtist, async (req, res) => {
   try {

      const loggedUser = req.currentUser;
      const products = await ProductModel.find({ owner: loggedUser._id });

      return res.status(200).json(products);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

productRouter.get("/:productId", isAuth, attachCurrentUser, isArtist, async (req, res) => {
   try {

      const product = await ProductModel.findOne({ _id: req.params.productId });

      return res.status(200).json(product);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

productRouter.put("/:productId", isAuth, attachCurrentUser, isArtist, async (req, res) => {
   try {

      const productUpdate = await ProductModel.findOneAndUpdate(
         { _id: req.params.productId },
         { ...req.body },
         { new: true, runValidators: true }
      );

      return res.status(200).json(productUpdate);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

productRouter.delete("/:productId", isAuth, attachCurrentUser, isArtist, async (req, res) => {
   try {
      const loggedUser = req.currentUser;
      const productDeleted = await ProductModel.findOne({ owner: loggedUser._id });

      const updateUserProducts = await UserModel.findOneAndUpdate(
         { _id: loggedUser._id },
         { $pull: { products: productDeleted._id } },
         { new: true }
      );

      await ProductModel.findOneAndDelete({ _id: productDeleted._id });

      return res.status(200).json(updateUserProducts);

   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
});

export { productRouter };