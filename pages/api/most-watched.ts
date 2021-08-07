import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/backend/middleware/mongodb';
import MostWatched from '@/utils/backend/models/mostWatched';
import MostWatchedStreamer from '@/utils/backend/models/mostWatchedStreamers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { streamer, vod } = req.body;

    if (streamer && vod) {
      try {
        const mostWatchedCreated = await MostWatched.findOneAndUpdate(
          { vod: vod.replace('v', '') },
          {
            vod: vod.replace('v', ''),
            $inc: { count: 1 },
            streamer: streamer,
          },
          { upsert: true, new: true },
        );

        await MostWatchedStreamer.findOneAndUpdate(
          { streamer: streamer },
          {
            $inc: { count: 1 },
            streamer: streamer,
          },
          { upsert: true, new: true },
        );

        return res
          .status(200)
          .json({ success: true, data: mostWatchedCreated });
      } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
      }
    } else {
      res.status(422).json({ error: true, message: 'Missing parameters' });
    }
  } else {
    res.status(422).json({ error: true, message: 'Method not allowed' });
  }
};

export default connectDB(handler);
