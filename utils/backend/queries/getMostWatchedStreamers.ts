import mostWatchedStreamers from '@/utils/backend/models/mostWatchedStreamers';

interface IGetMostWatchedStreamers {
  _id: string;
  streamer: string;
}

const getMostWatchedStreamers = async (
  limit?: number,
  offset?: number,
): Promise<IGetMostWatchedStreamers[]> => {
  const mostWatchedRanking = await mostWatchedStreamers
    .find({}, { _id: 1, streamer: 1 })
    .sort({ count: -1 })
    .skip(offset || 0)
    .limit(limit || 8);

  return mostWatchedRanking;
};

export default getMostWatchedStreamers;
