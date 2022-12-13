import { UserModel } from "../model/user.model.js";

export default async function attachCurrentUser(req, res, next) {
  try {
    const userData = req.auth;

    const user = await UserModel.findOne(
      { _id: userData._id },
      { passwordHash: 0 }
    );

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    req.currentUser = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
