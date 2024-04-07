/**
 * Module generating a public and private key-pair and save to current directory
 */

import crypto from 'crypto'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

// eslint-disable-next-line space-before-function-paren
function generateKeyPair() {
  // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice
    },
    privateKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem' // Most common formatting choice
    }
  })

  // The path to the config directory using path.join
  const configDir = path.join(__dirname, 'config')
  // The full path to the files
  const publicKeyPath = path.join(configDir, 'id_rsa_pub.pem')
  const privateKeyPath = path.join(configDir, 'id_rsa_priv.pem')

  // Create the public key file
  fs.writeFileSync(publicKeyPath, keyPair.publicKey)

  // Create the private key file
  fs.writeFileSync(privateKeyPath, keyPair.privateKey)

  // Encode the keys to base64
  const publicKeyBase64 = Buffer.from(keyPair.publicKey).toString('base64')
  const privateKeyBase64 = Buffer.from(keyPair.privateKey).toString('base64')

  // The full path to the base64 encoded files
  const publicKeyBase64Path = path.join(configDir, 'public_key_base64.txt')
  const privateKeyPathBase64Path = path.join(
    configDir,
    'private_key_base64.txt'
  )

  fs.writeFileSync(publicKeyBase64Path, publicKeyBase64)
  fs.writeFileSync(privateKeyPathBase64Path, privateKeyBase64)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Begin generating the key-pair
generateKeyPair()
