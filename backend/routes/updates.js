import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dbRun, dbQuery } from '../db.js';
import { authenticateJWT } from './admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure backend/uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max size to support videos
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|webm|ogg|mov/i;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, png, gif) and videos (mp4, webm, mov) are allowed!'));
  }
});

// 1. Admin Route: Upload Media File (Protected)
router.post('/upload', authenticateJWT, upload.single('mediaFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No media file provided for upload.' });
  }

  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, fileUrl });
  } catch (error) {
    console.error('Error handling uploaded file:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Public Route: Get all daily Goushala updates
router.get('/', async (req, res) => {
  try {
    const updates = await dbQuery(`
      SELECT * FROM daily_updates 
      ORDER BY created_at DESC
    `);
    res.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Admin Route: Post an update (Protected)
router.post('/', authenticateJWT, async (req, res) => {
  const { title, description, media_url, media_type } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  try {
    const result = await dbRun(
      `INSERT INTO daily_updates (title, description, media_url, media_type) VALUES (?, ?, ?, ?)`,
      [title, description, media_url || '', media_type || 'image']
    );
    res.status(201).json({ id: result.id, success: true, message: 'Update entry created.' });
  } catch (error) {
    console.error('Error creating update:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Admin Route: Delete an update (Protected)
router.delete('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbRun(`DELETE FROM daily_updates WHERE id = ?`, [id]);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Update not found.' });
    }
    res.json({ success: true, message: 'Deleted successfully.' });
  } catch (error) {
    console.error('Error deleting update:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
