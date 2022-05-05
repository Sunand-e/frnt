const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
  '/graphql': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/graphql': '/graphql'
    },
    changeOrigin: true
  },
  '/graphiql': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/graphiql': '/graphiql'
    },
    changeOrigin: true
  },
  '/uploads': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/uploads': '/uploads'
    },
    changeOrigin: false
  },
  '/auth': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/auth': '/auth'
    },
    changeOrigin: true
  },
  '/api/v1': {
    target: 'http://127.0.0.1', 
    pathRewrite: {
      '^/api/v1': '/api/v1'
    },
    changeOrigin: true
  },
  '/scorm-data': {
    target: 'http://127.0.0.1',
    pathRewrite: {
      '^/scorm-data': '/scorm-data'
    },
    changeOrigin: true
  },
  '/scorm': {
    target: 'http://127.0.0.1',
    pathRewrite: {
      '^/scorm': '/scorm'
    },
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
    server.use('/auth', createProxyMiddleware(apiPaths['/auth']));
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