import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Donation from '../models/Donation.js';

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
              description: `Thank you for supporting Krishna Govind Seva Sansthan NGO. Donor: ${donorName || 'Anonymous'}`,
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

    // Save temporary donation record with status 'pending' in MongoDB
    const newDonation = new Donation({
      stripe_session_id: session.id,
      donor_name: donorName || 'Anonymous',
      donor_email: donorEmail || 'N/A',
      amount: amount,
      currency: 'inr',
      status: 'pending'
    });
    await newDonation.save();

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

      // Find in our database and update status to completed
      let donation = await Donation.findOne({ stripe_session_id: sessionId });
      
      if (donation) {
        donation.donor_name = donorName;
        donation.donor_email = donorEmail;
        donation.status = 'completed';
        await donation.save();
      } else {
        donation = new Donation({
          stripe_session_id: sessionId,
          donor_name: donorName,
          donor_email: donorEmail,
          amount: amount,
          currency: 'inr',
          status: 'completed'
        });
        await donation.save();
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
