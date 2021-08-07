import mongoose from 'mongoose';

interface IMostWatched {
  vod: string;
  count: number;
  streamer: string;
}

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

export default mongoose.models.MostWatched ||
  mongoose.model<IMostWatched>('MostWatched', mostWatched);
