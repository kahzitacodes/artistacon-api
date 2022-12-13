export async function isArtist(req, res, next) {
   try {
      if (req.currentUser.role !== "ARTIST") {
         return res.status(401).json({ msg: "Usuário não autorizado. Permitido apenas para artistas." });
      }

      next();
   } catch (error) {
      console.log(error);
      return res.status(500).json(error);
   }
}
