const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3001
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const target = 'http://127.0.0.1'

// This custom router function will redirect any requests to the same URL, minus the port.
// For example, it will redirect any requests to http://t1.local:3001 to http://t1.local
function customRouter(req) {
  return `http://${req.hostname}`
}

const apiPaths = {
  '/graphql': {
    target: target, 
    pathRewrite: {
      '^/graphql': '/graphql'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/graphiql': {
    target: target, 
    pathRewrite: {
      '^/graphiql': '/graphiql'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/uploads': {
    target: target, 
    pathRewrite: {
      '^/uploads': '/uploads'
    },
    router: customRouter,
    changeOrigin: false
  },
  '/rails': {
    target: target, 
    pathRewrite: {
      '^/rails': '/rails'
    },
    router: customRouter,
    changeOrigin: false
  },
  '/api/v1': {
    target: target, 
    pathRewrite: {
      '^/api/v1': '/api/v1'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/scorm-data': {
    target: target,
    pathRewrite: {
      '^/scorm-data': '/scorm-data'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/scorm': {
    target: target,
    pathRewrite: {
      '^/scorm': '/scorm'
    },
    router: customRouter,
    changeOrigin: true
  },
  '/uploaded_images': {
    target: target,
    pathRewrite: {
      '^/uploaded_images': '/uploaded_images'
    },
    router: customRouter,
    changeOrigin: true
  }
}

const isDevelopment = process.env.NODE_ENV === 'development'

app.prepare().then(() => {
  const server = express()

  if (isDevelopment) {
    Object.keys(apiPaths).forEach(path => {
      server.use(path, createProxyMiddleware(apiPaths[path]));
    });
    server.use('/version.json', (req, res) => {
      res.json({
        version: '1.0.0'
      });
    });
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