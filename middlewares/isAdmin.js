export async function isAdmin(req, res, next) {
  try {
    if (req.currentUser.role !== "ADMIN") {
      return res.status(401).json({ msg: "Usuário não autorizado." });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
