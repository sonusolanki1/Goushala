import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.error("JWT Verification failed. Error:", err.message);
        console.error("process.env.JWT_SECRET is defined:", !!secret);
        return res
          .status(403)
          .json({ error: "Session expired or invalid token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "Authorization header missing" });
  }
};
