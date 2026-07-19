import express from 'express';
import { dbRun, dbQuery } from '../db.js';

const router = express.Router();

// Record a new page view/visitor
router.post('/record', async (req, res) => {
  const { path, referrer } = req.body;
  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const user_agent = req.headers['user-agent'] || 'Unknown';

  try {
    await dbRun(
      `INSERT INTO page_views (ip_address, path, user_agent, referrer) VALUES (?, ?, ?, ?)`,
      [ip_address, path || '/', user_agent, referrer || 'Direct']
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error logging page view:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
