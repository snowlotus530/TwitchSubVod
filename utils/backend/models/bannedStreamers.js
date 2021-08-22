import mongoose from 'mongoose';

const bannedStreamers = new mongoose.Schema(
  {
    streamer: {
      type: String,
      required: true,
    },
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

export default mongoose.models.BannedStreamers ||
  mongoose.model('BannedStreamers', bannedStreamers);
