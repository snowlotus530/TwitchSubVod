import bannedStreamers from '@/utils/backend/models/bannedStreamers';

interface IGetBannedStreamers {
  _id: string;
  streamer: string;
}

const getBannedStreamers = async (): Promise<IGetBannedStreamers[]> => {
  const allBannedStreamers = await bannedStreamers.find(
    {},
    { _id: 1, streamer: 1 },
  );

  return allBannedStreamers;
};

export default getBannedStreamers;
