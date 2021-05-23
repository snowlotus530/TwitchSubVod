import axios from 'axios';

const apiV2 = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: {
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_TOKEN,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_AUTH}`,
  },
});

export default apiV2;
