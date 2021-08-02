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

// todo: automate this with analitics data
const streamers = [
  'Elwycco',
  'Jltomy',
  'JLTomy',
  'Zwave69',
  'Melina',
  'Kamet0',
  'Squeezie',
  'Dekarldent',
  'Berry0314',
  'Amouranth',
  'Marvincalifornia',
  'Adinross',
  'Locklear',
];

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get(`users?login=${streamers.join(',')}`);

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
