import path from 'path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import connectDB from './config/database.js'
import routes from './routes/v1/index.js'
import { app, server } from './socket/socket.js'
/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
import './config/envConfig.js'

const __dirname = path.resolve()
// to set the security headers
app.use(helmet())

// no need to set rate limiter, already configured in nginx reverse proxy server

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
connectDB()

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))

// Allows our React application to make HTTP requests to Express application
//app.use(cors())

/**
 * -------------- ROUTES ----------------
 */
// v1 api routes
app.use('/api/v1', routes)
// Imports all of the routes from ./routes/index.js

app.use(express.static(path.join(__dirname, '/client/build')))

/**
 * -------------- CUSTOM ERROR HANDLER ----------------
 */
// Custom error-handler middleware for PayloadTooLargeError
app.use(function (err, req, res, next) {
  if (err.type === 'entity.too.large') {
    // Send a custom response with a 413 status code
    res.status(413).json({
      success: false,
      msg: 'Image size must be less than 1mb'
    })
  } else {
    // Pass the error to the next middleware if it's not a PayloadTooLargeError
    next(err)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})
/**
 * -------------- 404 ----------------
 */
app.use((req, res, next) => {
  res.status(404).json({ success: false, msg: 'URL not found' })
})
/**
 * -------------- SERVER ----------------
 */

// Connect to the database
// Listen for the 'connected' event on the Mongoose connection
// Server listens on http://localhost:3000
server.listen(process.env.PORT, () =>
  console.log(`Server running on port: http://localhost:${process.env.PORT}`)
)
