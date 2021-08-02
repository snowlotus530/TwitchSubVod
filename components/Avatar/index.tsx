import React from 'react';
import Link from 'next/link';

import {
  AvatarContainer,
  StreamerAvatar,
  StreamerInformation,
  StreamerName,
  StreamerDescription,
} from './styles';

interface IAvatar {
  streamerName: string;
  avatar: string;
  bio: string;
  name: string;
}

const Avatar = ({ streamerName, avatar, bio, name }: IAvatar) => {
  return (
    <Link href={`/videos/${name}`}>
      <a>
        <AvatarContainer>
          <StreamerAvatar
            src={avatar}
            width="227px"
            height="227px"
            placeholder="blur"
          />
          <StreamerInformation>
            <StreamerName>{streamerName}</StreamerName>
            <StreamerDescription>{bio}</StreamerDescription>
          </StreamerInformation>
        </AvatarContainer>
      </a>
    </Link>
  );
};

export default Avatar;
