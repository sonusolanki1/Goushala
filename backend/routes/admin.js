import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { dbQuery, dbGet } from '../db.js';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_krishna_govind_key_108';

// JWT Authentication Middleware
export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Session expired or invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization header missing' });
  }
};

// Admin Login Route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || 'krishnagovind108';

  if (username === expectedUsername && password === expectedPassword) {
    const accessToken = jwt.sign({ username: username, role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token: accessToken });
  }

  res.status(401).json({ error: 'Invalid username or password' });
});

// Admin Dashboard Summary Stats
router.get('/dashboard-stats', authenticateJWT, async (req, res) => {
  try {
    // 1. Total & Successful donations
    const donationStats = await dbGet(`
      SELECT 
        SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as totalAmount,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completedCount,
        COUNT(*) as totalCount
      FROM donations
    `);

    // 2. Total views
    const viewStats = await dbGet(`
      SELECT COUNT(*) as totalViews FROM page_views
    `);

    // 3. Unique visitors (based on IP address)
    const uniqueVisitorStats = await dbGet(`
      SELECT COUNT(DISTINCT ip_address) as uniqueVisitors FROM page_views
    `);

    // 4. Page views by route/path
    const pathViews = await dbQuery(`
      SELECT path, COUNT(*) as count 
      FROM page_views 
      GROUP BY path 
      ORDER BY count DESC
    `);

    res.json({
      donations: {
        totalAmount: donationStats.totalAmount || 0,
        completedCount: donationStats.completedCount || 0,
        totalCount: donationStats.totalCount || 0,
      },
      views: {
        totalViews: viewStats.totalViews || 0,
        uniqueVisitors: uniqueVisitorStats.uniqueVisitors || 0,
      },
      pathViews,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get List of Donations
router.get('/donations', authenticateJWT, async (req, res) => {
  try {
    const donations = await dbQuery(`
      SELECT * FROM donations 
      ORDER BY created_at DESC
    `);
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations list:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get List of Visitors
router.get('/visitors', authenticateJWT, async (req, res) => {
  try {
    const visitors = await dbQuery(`
      SELECT * FROM page_views 
      ORDER BY timestamp DESC 
      LIMIT 200
    `);
    res.json(visitors);
  } catch (error) {
    console.error('Error fetching visitors list:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
