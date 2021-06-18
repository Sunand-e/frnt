// webpack.config.js
const GenerateGraphQLPossibleTypes = require('./webpack/getGraphQLPossibleTypes');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({

  future: {
    webpack5: true,
  },
  
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  },
  
  // the basePath needs to be set if the app is accessed in a subdirectory of a domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    isServer && config.plugins.push(new GenerateGraphQLPossibleTypes())

    // Important: return the modified config
    return config
  },
})