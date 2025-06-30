export const isAdmin = (req, res, next) => {
  console.log("ICI ", req.user.role)
  if (!req.user || req.user.role !== "ADMIN") {
    console.log(req.user.role)
    return res.status(403).json({ error: "Accès réservé aux administrateurs." });
  }
  next();
};
