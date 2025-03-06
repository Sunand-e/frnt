const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// This custom router function will redirect any requests to the same URL, minus the port.
// For example, it will redirect any requests to http://t1.local:3001 to http://t1.local
function customRouter(req) {
  // const tenant = hostname.split('.')[0]
  return `http://${req.hostname}`
}

const apiPaths = {
  '/graphql': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/graphql': '/graphql'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/graphiql': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/graphiql': '/graphiql'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/uploads': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/uploads': '/uploads'
    },
    router: customRouter,
    changeOrigin: false
  },
  '/rails': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/rails': '/rails'
    },
    router: customRouter,
    changeOrigin: false
  },
  '/api/v1': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/api/v1': '/api/v1'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/scorm-data': {
    target: 'http://127.0.0.1',
    pathRewrite: {
      '^/scorm-data': '/scorm-data'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/scorm': {
    target: 'http://127.0.0.1',
    pathRewrite: {
      '^/scorm': '/scorm'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/uploaded_images': {
    target: 'http://127.0.0.1',
    pathRewrite: {
      '^/uploaded_images': '/uploaded_images'
    },
    router: customRouter,
    changeOrigin: true
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

app.prepare().then(() => {
  const server = express()
 
  if (isDevelopment) {
    server.use('/graphql', createProxyMiddleware(apiPaths['/graphql']));
    server.use('/graphiql', createProxyMiddleware(apiPaths['/graphiql']));
    server.use('/uploads', createProxyMiddleware(apiPaths['/uploads']));
    server.use('/rails', createProxyMiddleware(apiPaths['/rails']));
    server.use('/uploaded_images', createProxyMiddleware(apiPaths['/uploaded_images']));
    server.use('/scorm-data', createProxyMiddleware(apiPaths['/scorm-data']));
    server.use('/scorm', createProxyMiddleware(apiPaths['/scorm']));
    server.use('/api/v1', createProxyMiddleware(apiPaths['/api/v1']));
  }

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('Error:::::', err)
})