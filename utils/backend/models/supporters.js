import mongoose from 'mongoose';

const transactionsSchema = new mongoose.Schema(
  {
    transaction: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  { _id: false },
);

const supporters = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactions: [transactionsSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

if (process.env.NODE_ENV === 'development') {
  // when nextjs recompiles in dev mode it tries to recompile the model too, which causes an error of model overwrite
  mongoose.models = {};
}

export default mongoose.models.supporters ||
  mongoose.model('Supporters', supporters);
