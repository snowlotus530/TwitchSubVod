const withImages = require('next-images');
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = withImages({
  images: {
    domains: ['twitch.tv'],
  },
  async redirects() {
    return [
      {
        source: '/Videos',
        destination: '/videos',
        permanent: true,
      },
    ];
  },
});

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
