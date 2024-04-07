import { userController } from '../../controllers/index.js'
import express from 'express'
import { authMiddleware } from '../../utils/helper.js'
const router = express.Router()

/**
 * -------------- USER AUTHENTICATION ROUTES ----------------
 */
router.route('/register').post(userController.register)
router.route('/login').post(userController.login)
/**
 * -------------- USER PROFILE ROUTES ----------------
 */
router.route('/profile/:id').put(authMiddleware, userController.setDetails)
router.route('/profile/:id').get(authMiddleware, userController.fetchDetails)

/**
 * -------------- USER MATCHING ROUTES ----------------
 */
router.route('/suggestions/:id').get(authMiddleware, userController.suggestions)

/**
 * -------------- USER MESSAGE ROUTES ----------------
 */
router
  .route('/messages/:senderId/:receiverId')
  .get(authMiddleware, userController.getMessage)
router
  .route('/messages/send/:senderId/:receiverId')
  .post(authMiddleware, userController.sendMessage)

/**
 * -------------- USER FEEDBACK ROUTES ----------------
 */
router.route('/feedback/:id').post(authMiddleware, userController.sendFeedback)

export default router
