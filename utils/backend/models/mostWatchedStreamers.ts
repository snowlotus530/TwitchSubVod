import mongoose from 'mongoose';

interface IMostWatchedStreamer {
  streamer: string;
  count: number;
}

const mostWatchedStreamer = new mongoose.Schema(
  {
    streamer: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.models.mostWatchedStreamer ||
  mongoose.model<IMostWatchedStreamer>(
    'MostWatchedStreamer',
    mostWatchedStreamer,
  );
