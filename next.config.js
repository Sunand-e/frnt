// webpack.config.js
const GenerateGraphQLPossibleTypes = require('./webpack/getGraphQLPossibleTypes');

module.exports = {
  // the basePath needs to be set if the app is accessed in a subdirectory of a domain.
  // basePath: '/wp-content/out',
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    isServer && config.plugins.push(new GenerateGraphQLPossibleTypes())

    // Important: return the modified config
    return config
  },
}