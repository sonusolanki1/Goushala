import express from 'express';
import PageView from '../models/PageView.js';

const router = express.Router();

// Record a new page view/visitor in MongoDB
router.post('/record', async (req, res) => {
  const { path, referrer } = req.body;
  const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';
  const user_agent = req.headers['user-agent'] || 'Unknown';

  try {
    const newView = new PageView({
      ip_address,
      path: path || '/',
      user_agent,
      referrer: referrer || 'Direct'
    });
    await newView.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error logging page view:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
