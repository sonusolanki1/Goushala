import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authenticateJWT } from "./middleware/auth.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log("Loaded JWT_SECRET from process.env:", JWT_SECRET);

if (!JWT_SECRET) {
  console.error("ERROR: JWT_SECRET is not defined!");
  process.exit(1);
}

const payload = { id: "test-id", username: "admin", role: "admin" };
const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
console.log("Successfully signed token:", token);

jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    console.error("Verification failed:", err.message);
  } else {
    console.log("Verification succeeded! Decoded payload:", decoded);
  }
});
