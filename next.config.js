// webpack.config.js
// const GenerateGraphQLPossibleTypes = require('./webpack/getGraphQLPossibleTypes');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    UPLOAD_API_URL: process.env.UPLOAD_API_URL
  },
  
  // the basePath needs to be set if the app is accessed in a subdirectory of a domain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  experimental:{
    transpilePackages: [
      "@fullcalendar/common",
      "@babel/preset-react",
      "@fullcalendar/common",
      "@fullcalendar/daygrid",
      "@fullcalendar/interaction",
      "@fullcalendar/react",
      "@fullcalendar/timegrid"      
    ]
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    config.module.rules.push({
      test: /\.(svg|png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })
    // config.resolve.alias.canvas = false
    
    // fix for Plate which uses 'fs' in cosmiconfig package
    // if (!isServer) {
    //   config.resolve.fallback.fs = false;
    //   config.resolve.fallback.module = false;
    // }
    
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // isServer && config.plugins.push(new GenerateGraphQLPossibleTypes())

    // Important: return the modified config
    return config
  },
})