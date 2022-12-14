import * as dotenv from "dotenv";
import express from "express";
import { generateToken } from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { UserModel } from "../model/user.model.js";
import { BioModel } from "../model/bio.model.js";
import { ProductModel } from "../model/product.model.js";

import bcrypt from "bcrypt";
import { isArtist } from "../middlewares/isArtist.js";

dotenv.config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
      )
    ) {
      return res.status(400).json({
        msg: "Email ou senha invalidos. Verifique se ambos atendem as requisições.",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    delete createdUser._doc.passwordHash;
    return res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Email ou senha invalidos." });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      const token = generateToken(user);

      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id,
          role: user.role,
        },
        token: token,
      });
    } else {
      return res.status(401).json({ msg: "Email ou senha invalidos." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.post("/favorites/:productId", isAuth, attachCurrentUser, async (req, res) => {
  try {

    const loggedUser = req.currentUser;
    const product = await ProductModel.findOne({ _id: req.params.productId });

    await UserModel.findOneAndUpdate(
      { _id: loggedUser._id },
      { $push: { favorites: product._id } },
      { new: true }
    );

    return res.status(200).json(product);

  } catch (error) {
    console.log(error);
    return res.stauts(500).json(error);
  }
});

userRouter.delete("/favorites/:productId", isAuth, attachCurrentUser, async (req, res) => {
  try {

    const loggedUser = req.currentUser;
    const product = await ProductModel.findOne({ _id: req.params.productId });

    await UserModel.findOneAndUpdate(
      { _id: loggedUser._id },
      { $pull: { favorites: product._id } },
      { new: true }
    );

    return res.status(200).json(product);

  } catch (error) {
    console.log(error);
    return res.stauts(500).json(error);
  }
});

userRouter.get("/account", isAuth, attachCurrentUser, async (req, res) => {
  try {

    const loggedUser = req.currentUser;

    const user = await UserModel.findOne(
      { _id: loggedUser._id },
      { passwordHash: 0 }
    ).populate("bio");


    return res.status(200).json(user);

  } catch (error) {
    console.log();
    return res.status(500).json(error);
  }
});

userRouter.get("/bio", isAuth, attachCurrentUser, isArtist, async (req, res) => {
  try {

    const loggedUser = req.currentUser;
    const userBio = await BioModel.findOne({ owner: loggedUser._id });


    return res.status(200).json(userBio);

  } catch (error) {
    console.log();
    return res.status(500).json(error);
  }
});

userRouter.post("/bio", isAuth, attachCurrentUser, isArtist, async (req, res) => {
  try {

    const loggedUser = req.currentUser;

    const bio = await BioModel.create({
      ...req.body,
      owner: loggedUser._id
    });

    await UserModel.findOneAndUpdate(
      { _id: loggedUser._id },
      { bio: bio._doc._id },
      { new: true, runValidators: true }
    );

    return res.status(200).json(bio);

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

userRouter.put("/bio", isAuth, attachCurrentUser, isArtist, async (req, res) => {
  try {

    const loggedUser = req.currentUser;

    const bio = await BioModel.findOneAndUpdate(
      { _id: loggedUser.bio },
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(bio);

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export { userRouter };
