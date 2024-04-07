import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const configDir = path.join(__dirname, '../config')
const pathToPrivKey = path.join(configDir, 'id_rsa_priv.pem')
const pathToPubKey = path.join(configDir, 'id_rsa_pub.pem')

const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8')
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8')

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */

const validPassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return hash === hashVerify
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  return {
    salt,
    hash: genHash
  }
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
const issueJWT = (user) => {
  const _id = user._id
  const expiresIn = '1d'
  const payload = {
    sub: _id,
    iat: Date.now()
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: 'RS256'
  })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  }
}

const authMiddleware = (req, res, next) => {
  const tokenParts = req.headers.authorization.split(' ')

  if (
    tokenParts[0] === 'Bearer' &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ['RS256']
      })
      req.jwt = verification
      next()
    } catch (err) {
      res.status(401).json({
        success: false,
        msg: 'You are not authorized to visit this route'
      })
    }
  } else {
    res.status(401).json({
      success: false,
      msg: 'You are not authorized to visit this route'
    })
  }
}

export { validPassword, genPassword, issueJWT, authMiddleware }
