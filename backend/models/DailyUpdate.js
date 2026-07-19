import mongoose from 'mongoose';

const dailyUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  media_url: {
    type: String,
    default: ''
  },
  media_type: {
    type: String,
    default: 'image' // 'image', 'video'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const DailyUpdate = mongoose.model('DailyUpdate', dailyUpdateSchema);
export default DailyUpdate;
