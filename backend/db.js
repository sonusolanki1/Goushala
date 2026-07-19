import mongoose from "mongoose";
import dotenv from "dotenv";
import DailyUpdate from "./models/DailyUpdate.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    seedDefaultUpdates();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

async function seedDefaultUpdates() {
  try {
    const count = await DailyUpdate.countDocuments();
    if (count === 0) {
      await DailyUpdate.insertMany([
        {
          title: "Morning Gau Seva & Aarti in Vrindavan Sanctuary",
          description:
            "Our daily routine starts with a beautiful Gau Aarti and serving fresh green fodder to all cows in the shelter.",
          media_url: "https://www.youtube.com/watch?v=kYJjO3uD0dY",
          media_type: "video",
        },
        {
          title: "Holy Cow calves playing in the green meadows",
          description:
            "A healthy calf is the future of our Goushala. We take specialized veterinary and nutritional care of newborn calves.",
          media_url:
            "https://assets.mixkit.co/videos/preview/mixkit-cows-grazing-in-a-green-meadow-40762-large.mp4",
          media_type: "video",
        },
      ]);
      console.log("Seeded default updates to MongoDB successfully.");
    }
  } catch (err) {
    console.error("Error seeding default updates to MongoDB:", err.message);
  }
}

export default mongoose.connection;
