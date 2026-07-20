import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
import "dotenv/config";
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    seedDefaultUsers();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

async function seedDefaultUsers() {
  try {
    const hashedPassword = await bcrypt.hash("krishnagovind108", 10);
    
    // Find admin user and update/upsert to ensure email, password and role are correctly set
    await User.findOneAndUpdate(
      { username: "admin" },
      {
        $setOnInsert: { email: "admin@goushala.org" },
        $set: {
          password: hashedPassword,
          role: "admin"
        }
      },
      { upsert: true, returnDocument: 'after', runValidators: false }
    );
    console.log("Seeded/Updated default admin user in MongoDB successfully.");
  } catch (err) {
    console.error("Error seeding default users to MongoDB:", err.message);
  }
}

export default mongoose.connection;
