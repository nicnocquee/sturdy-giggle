require("dotenv").config();

const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const config = {
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      // Read the .env file

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    if (config.target === "web") {
      config.plugins = [
        ...config.plugins,
        new webpack.IgnorePlugin(/mongoose/),
        new webpack.IgnorePlugin(/lib\/auth/)
      ];
    }

    return config;
  }
};

module.exports = withBundleAnalyzer(config);
