import React from 'react';
import data from './videos/data.json';

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
      <loc>https://pogu.live/DeletedClips</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://pogu.live/DeletedVods</loc>
      <lastmod>2021-02-06</lastmod>
      <changefreq>monthly</changefreq>
      <priority>1</priority>
    </url>
    <url>
      <loc>https://pogu.live/DownloadClip</loc>
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
    const streamers = data.mostSearchedStreamers;

    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(streamers));
    res.end();
  }
}

export default Sitemap;
