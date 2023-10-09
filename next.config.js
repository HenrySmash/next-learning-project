/** @type {import('next').NextConfig} */
const path = require('path');
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  reactStrictMode: true,
    trailingSlash: true,
    compress: true,
    experimental: {
        serverActions: true
    },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/assets/styles')],
    prependData: `@import "_mixins.scss"; @import "_breakpoints.scss";`
}

};

const sentryWebpackPluginOptions = {
  org: "twistag",
  project: "REPLACE ME",
  silent: true
};


module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
