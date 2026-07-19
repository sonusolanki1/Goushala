import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { dbRun, dbGet } from '../db.js';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { amount, donorName, donorEmail, sevaType } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid donation amount' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Seva Contribution: ${sevaType || 'General Seva'}`,
              description: `Thank you for supporting Krishna Govind Seva Sansthan Trust. Donor: ${donorName || 'Anonymous'}`,
            },
            unit_amount: Math.round(amount * 100), // convert to paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: donorEmail || undefined,
      success_url: `${process.env.FRONTEND_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donation-cancel`,
      metadata: {
        donorName: donorName || 'Anonymous',
        donorEmail: donorEmail || 'N/A',
        sevaType: sevaType || 'General Seva',
        amount: amount.toString(),
      },
    });

    // Save temporary donation record with status 'pending'
    await dbRun(
      `INSERT INTO donations (stripe_session_id, donor_name, donor_email, amount, currency, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [session.id, donorName || 'Anonymous', donorEmail || 'N/A', amount, 'inr', 'pending']
    );

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify donation completion (fallback/manual verification endpoint called from frontend)
router.get('/verify-session/:sessionId', async (req, res) => {
  const { sessionId } = req.params;

  try {
    // 1. Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === 'paid') {
      const donorName = session.metadata.donorName || session.customer_details?.name || 'Anonymous';
      const donorEmail = session.metadata.donorEmail || session.customer_details?.email || 'N/A';
      const amount = parseFloat(session.metadata.amount) || (session.amount_total / 100);

      // Update in our database if status is pending
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
      
      return res.json({ status: 'completed', amount, donorName });
    } else {
      return res.json({ status: session.payment_status });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
