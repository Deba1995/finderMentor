// envConfig.js
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Construct the absolute path to the .env file in the root directory
const rootPath = path.resolve(__dirname, '..')
const envPath = path.join(rootPath, '.env')

// Load the .env file using the absolute path
dotenv.config({ path: envPath })

// Optionally, export the loaded environment variables for use in other modules
export default process.env
