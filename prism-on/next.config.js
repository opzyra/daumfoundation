const withPlugins = require('next-compose-plugins');

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: false,
  devIndicators: false,
  experimental: {
    scrollRestoration: true,
  },
  pageExtensions: ['tsx', 'jsx'],
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  images: {
    deviceSizes: [767, 1024, 1440, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  transpilePackages: [
    'antd-mobile',
    '@ant-design',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-input',
    'rc-table',
    'rc-tree',
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
      type: 'asset/resource',
    });

    const rules = config.module.rules.find((rule) =>
      Array.isArray(rule.oneOf),
    )?.oneOf;

    if (rules) {
      for (const rule of rules) {
        if (
          rule.sideEffects === true &&
          (rule.test?.toString().includes('css') ||
            rule.test?.toString().includes('scss') ||
            rule.test?.toString().includes('sass'))
        ) {
          if ('issuer' in rule) {
            delete rule.issuer;
          }
        }
      }
    }

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
