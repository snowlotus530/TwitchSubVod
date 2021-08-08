import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/backend/middleware/mongodb';
import MostWatched from '@/utils/backend/models/mostWatched';
import MostWatchedStreamer from '@/utils/backend/models/mostWatchedStreamers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
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

          console.log('POST /most-watched', mostWatchedCreated);
          return res
            .status(200)
            .json({ success: true, data: mostWatchedCreated });
        } catch (error) {
          console.log('ERROR POST /most-watched', error.message);
          return res.status(500).json({ error: true, message: error.message });
        }
      } else {
        console.log('ERROR POST /most-watched', 'Missing parameters');
        res.status(422).json({ error: true, message: 'Missing parameters' });
      }
      break;

    default:
      res.status(422).json({ error: true, message: 'Method not allowed' });
      break;
  }
};

export default connectDB(handler);
