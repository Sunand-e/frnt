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
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production'

app.prepare().then(() => {
  const server = express()
 
  if (isDevelopment) {
    server.use('/graphql', createProxyMiddleware(apiPaths['/graphql']));
    server.use('/uploads', createProxyMiddleware(apiPaths['/uploads']));
    server.use('/auth', createProxyMiddleware(apiPaths['/auth']));
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