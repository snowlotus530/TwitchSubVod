import mongoose from 'mongoose';

const mostWatched = new mongoose.Schema(
  {
    vod: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
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

export default mongoose.models.MostWatched ||
  mongoose.model('MostWatched', mostWatched);
