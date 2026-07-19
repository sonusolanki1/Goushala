import mongoose from 'mongoose';

const pageViewSchema = new mongoose.Schema({
  ip_address: {
    type: String,
    default: 'Unknown'
  },
  path: {
    type: String,
    default: '/'
  },
  user_agent: {
    type: String,
    default: 'Unknown'
  },
  referrer: {
    type: String,
    default: 'Direct'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const PageView = mongoose.model('PageView', pageViewSchema);
export default PageView;
