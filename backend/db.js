import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'goushala.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initializeTables();
  }
});

function initializeTables() {
  db.serialize(() => {
    // Donations Table
    db.run(`
      CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stripe_session_id TEXT UNIQUE,
        donor_name TEXT,
        donor_email TEXT,
        amount REAL,
        currency TEXT,
        status TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating donations table:', err.message);
    });

    // Page Views / Visitor Logs Table for Admin Panel Dashboard
    db.run(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip_address TEXT,
        path TEXT,
        user_agent TEXT,
        referrer TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating page_views table:', err.message);
    });

    // Daily Updates / Blog Table
    db.run(`
      CREATE TABLE IF NOT EXISTS daily_updates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        media_url TEXT,
        media_type TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating daily_updates table:', err.message);
      } else {
        // Seed default updates if empty
        db.get("SELECT COUNT(*) as count FROM daily_updates", (err, row) => {
          if (!err && row && row.count === 0) {
            db.run(`
              INSERT INTO daily_updates (title, description, media_url, media_type) VALUES 
              ('Morning Gau Seva & Aarti in Vrindavan Sanctuary', 'Our daily routine starts with a beautiful Gau Aarti and serving fresh green fodder to all cows in the shelter.', 'https://www.youtube.com/watch?v=kYJjO3uD0dY', 'video'),
              ('Holy Cow calves playing in the green meadows', 'A healthy calf is the future of our Goushala. We take specialized veterinary and nutritional care of newborn calves.', 'https://assets.mixkit.co/videos/preview/mixkit-cows-grazing-in-a-green-meadow-40762-large.mp4', 'video')
            `);
          }
        });
      }
    });
  });
}

// Helper methods to wrap SQLite operations in Promises
export const dbQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export default db;
