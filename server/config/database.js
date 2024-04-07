import mongoose from 'mongoose'
import './envConfig.js'

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

const devConnection = process.env.DB_STRING
const prodConnection = process.env.DB_STRING_PROD

// Connect to the correct environment database
const connectDB = () => {
  if (process.env.NODE_ENV === 'production') {
    mongoose.connect(prodConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
      console.log('Database connected to production server')
    })
  } else {
    mongoose.connect(devConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
      console.log('Database connected to development server')
    })
  }
}

export default connectDB
