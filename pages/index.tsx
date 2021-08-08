import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import ReactGA from 'react-ga';
import {
  Container,
  AnimationContainer,
  AvatarsGroupContainer,
  AvatarsGroup,
} from '@/styles/Home';
import LinkBox from '@/components/LinkBox';
import Footer from '@/components/Footer';
import SearchInput from '@/components/SearchInput';
import Avatar from '@/components/Avatar';
import api from '@/utils/services/api';
import { getMostWatchedStreamers } from '@/utils/backend/queries';
import dbConnect from '@/utils/backend/lib/dbConnect';

interface IUsers {
  bio: string;
  created_at: string;
  display_name: string;
  logo: string;
  name: string;
  type: string;
  updated_at: string;
  _id: string;
}

interface IStreamers {
  streamers: IUsers[];
}

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const streamers = await getMostWatchedStreamers(16, 0);

  const { data } = await api.get(
    `users?login=${streamers.map((streamer) => streamer.streamer).join(',')}`,
  );

  console.log('GET getMostWatchedStreamers fn(getStaticPaths) screen(/)');

  return {
    props: {
      streamers: data.users,
    },
    revalidate: 86400, // 1 day
  };
};

const Home = ({ streamers }: IStreamers) => {
  useEffect(() => {
    ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_TRACKING}`, {
      testMode: process.env.NODE_ENV === 'test',
    });
    ReactGA.pageview('/');
  }, []);

  return (
    <Container>
      <AnimationContainer>
        <h1>Twitch Sub Vod</h1>
        <SearchInput />

        <LinkBox clips />
        <LinkBox vods />
        <LinkBox download />
      </AnimationContainer>

      <h1>Most watched streamers this week</h1>
      <AvatarsGroupContainer>
        <AvatarsGroup>
          {streamers &&
            streamers.map((streamer) => (
              <Avatar
                key={streamer._id}
                streamerName={streamer.display_name}
                name={streamer.name}
                bio={streamer.bio}
                avatar={streamer.logo}
              />
            ))}
        </AvatarsGroup>
      </AvatarsGroupContainer>

      <Footer />
    </Container>
  );
};

export default Home;
