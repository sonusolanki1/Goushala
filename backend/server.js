import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { dbRun, dbGet } from './db.js';
import paymentRouter from './routes/payment.js';
import analyticsRouter from './routes/analytics.js';
import adminRouter from './routes/admin.js';
import updatesRouter from './routes/updates.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Serve static uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Stripe Webhook Endpoint (requires raw body, must be defined BEFORE express.json())
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Webhook verification failed: Missing stripe-signature or webhook secret');
    return res.status(400).send('Webhook Error: Missing signature or secret');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook Error verifying signature: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    const donorName = session.metadata.donorName || session.customer_details?.name || 'Anonymous';
    const donorEmail = session.metadata.donorEmail || session.customer_details?.email || 'N/A';
    const amount = parseFloat(session.metadata.amount) || (session.amount_total / 100);
    const sessionId = session.id;

    console.log(`Donation received! Session: ${sessionId}, Name: ${donorName}, Amount: ${amount}`);

    try {
      // Safely check if record exists, then update or insert
      const existing = await dbGet(`SELECT * FROM donations WHERE stripe_session_id = ?`, [sessionId]);
      
      if (existing) {
        await dbRun(
          `UPDATE donations SET donor_name = ?, donor_email = ?, status = 'completed' WHERE stripe_session_id = ?`,
          [donorName, donorEmail, sessionId]
        );
      } else {
        await dbRun(
          `INSERT INTO donations (stripe_session_id, donor_name, donor_email, amount, currency, status) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [sessionId, donorName, donorEmail, amount, 'inr', 'completed']
        );
      }
      console.log('Donation successfully recorded in database.');
    } catch (dbErr) {
      console.error('Error saving webhook donation to database:', dbErr.message);
    }
  }

  res.json({ received: true });
});

// JSON parsing middleware for other routes
app.use(express.json());

// Routes
app.use('/api/payment', paymentRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/updates', updatesRouter);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Krishna Govind Seva Sansthan NGO API is running.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Stripe Secret Key loaded: ${process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No'}`);
  console.log(`Stripe Webhook Secret loaded: ${process.env.STRIPE_WEBHOOK_SECRET ? 'Yes' : 'No'}`);
});
