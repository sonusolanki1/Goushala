import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  stripe_session_id: {
    type: String,
    unique: true,
    sparse: true
  },
  payment_intent_id: {
    type: String,
    default: ''
  },
  donor_name: {
    type: String,
    default: 'Anonymous'
  },
  donor_email: {
    type: String,
    default: 'N/A'
  },
  donor_phone: {
    type: String,
    default: ''
  },
  seva_type: {
    type: String,
    default: 'General Seva'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'inr'
  },
  payment_method: {
    type: String,
    default: 'card'
  },
  status: {
    type: String,
    default: 'pending' // 'pending', 'completed'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
