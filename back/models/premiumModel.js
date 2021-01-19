import mongoose from 'mongoose';

const premiumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const Premium = mongoose.model('Premium', premiumSchema);

export default Premium;
