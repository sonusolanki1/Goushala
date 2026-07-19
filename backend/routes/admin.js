import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Donation from "../models/Donation.js";
import PageView from "../models/PageView.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// JWT Authentication Middleware
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
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

// Admin Login Route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (username === expectedUsername && password === expectedPassword) {
    const accessToken = jwt.sign(
      { username: username, role: "admin" },
      JWT_SECRET,
      { expiresIn: "2h" },
    );
    return res.json({ token: accessToken });
  }

  res.status(401).json({ error: "Invalid username or password" });
});

// Admin Dashboard Summary Stats using Mongoose
router.get("/dashboard-stats", authenticateJWT, async (req, res) => {
  try {
    // 1. Total & Successful donations aggregate
    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, "$amount", 0] },
          },
          completedCount: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          totalCount: { $sum: 1 },
        },
      },
    ]);

    const dStats = donationStats[0] || {
      totalAmount: 0,
      completedCount: 0,
      totalCount: 0,
    };

    // 2. Total views (excluding admin paths)
    const totalViews = await PageView.countDocuments({
      path: { $not: /\/seva-trust\/admin/ },
    });

    // 3. Unique visitors (distinct IP count, excluding admin paths)
    const distinctIps = await PageView.distinct("ip_address", {
      path: { $not: /\/seva-trust\/admin/ },
    });
    const uniqueVisitors = distinctIps.length;

    // 4. Page views by route/path (excluding admin paths)
    const pathViews = await PageView.aggregate([
      { $match: { path: { $not: /\/seva-trust\/admin/ } } },
      { $group: { _id: "$path", count: { $sum: 1 } } },
      { $project: { path: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      donations: {
        totalAmount: dStats.totalAmount,
        completedCount: dStats.completedCount,
        totalCount: dStats.totalCount,
      },
      views: {
        totalViews,
        uniqueVisitors,
      },
      pathViews,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get List of Donations
router.get("/donations", authenticateJWT, async (req, res) => {
  try {
    const donations = await Donation.find().sort({ created_at: -1 });
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations list:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get List of Visitors
router.get("/visitors", authenticateJWT, async (req, res) => {
  try {
    const visitors = await PageView.find({
      path: { $not: /\/seva-trust\/admin/ },
    })
      .sort({ timestamp: -1 })
      .limit(200);
    res.json(visitors);
  } catch (error) {
    console.error("Error fetching visitors list:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
