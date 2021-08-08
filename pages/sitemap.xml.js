import React from 'react';
import { getMostWatchedStreamers } from '@/utils/backend/queries';
import dbConnect from '@/utils/backend/lib/dbConnect';

const EXTERNAL_DATA_URL = 'https://pogu.live/videos';

const createSitemap = (streamers) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://pogu.live/</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://pogu.live/deletedclips</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://pogu.live/deletedvods</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://pogu.live/downloadclip</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
        ${streamers
          .map((streamer) => {
            return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/${streamer}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
          })
          .join('')}
    </urlset>
    `;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    await dbConnect();
    const mostWatchedRanking = await getMostWatchedStreamers(300, 0);

    const streamers = mostWatchedRanking.map((streamer) =>
      streamer.streamer.toLowerCase(),
    );

    console.log(streamers.length);

    console.log(
      'GET getMostWatchedStreamers fn(getInitialProps) screen(/sitemap.xml)',
    );

    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(streamers));
    res.end();
  }
}

export default Sitemap;
