import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  stripe_session_id: {
    type: String,
    unique: true,
    sparse: true
  },
  donor_name: {
    type: String,
    default: 'Anonymous'
  },
  donor_email: {
    type: String,
    default: 'N/A'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'inr'
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
