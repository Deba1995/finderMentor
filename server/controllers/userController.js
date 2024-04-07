import { userService } from '../services/index.js'

const register = async (req, res, next) => {
  try {
    await userService.registerUser(req.body)
    res.status(200).send({ success: true })
  } catch (error) {
    if (
      error.message === 'The email is already in use' ||
      error.message === 'Password must be at least 5 characters long'
    ) {
      res.status(409).send({ success: false, msg: error.message })
    } else if (error.name === 'ValidationError') {
      res
        .status(400)
        .send({ success: false, msg: 'Please fill in all the required fields' })
    } else {
      res.status(500).send({ success: false, msg: error.message })
    }
  }
}

const login = async (req, res, next) => {
  try {
    const loginStatus = await userService.loginUser(req.body, res)
    res.status(200).send({ success: true, loginStatus })
  } catch (error) {
    if (
      error.message === 'Could not find that email' ||
      error.message === 'You entered the wrong password'
    ) {
      // Handle validation errors
      res.status(400).send({ success: false, msg: error.message })
    } else {
      // Handle internal server errors
      res.status(500).send({ success: false, msg: 'Internal server error' })
    }
  }
}

const setDetails = async (req, res) => {
  try {
    await userService.detailsUser({
      body: req.body,
      id: req.params
    })

    res.status(200).send({ success: true })
  } catch (error) {
    if (
      error.message === 'Invalid ID format' ||
      error.message === 'User not found'
    ) {
      res.status(400).send({ success: false, msg: error.message })
    } else {
      res.status(500).send({ success: false, msg: 'Internal server error' })
    }
  }
}
const fetchDetails = async (req, res) => {
  try {
    const userDetails = await userService.getDetailsUser({
      id: req.params
    })
    res.status(200).send({ success: true, userDetails })
  } catch (error) {
    if (
      error.message === 'Invalid ID format' ||
      error.message === 'User not found'
    ) {
      res.status(400).send({ success: false, msg: error.message })
    } else {
      res.status(500).send({ success: false, msg: 'Internal server error' })
    }
  }
}

const suggestions = async (req, res) => {
  try {
    const userDetails = await userService.getSuggestions({
      id: req.params
    })

    res.status(200).send({ success: true, userDetails })
  } catch (error) {
    res.status(500).send({ success: false, msg: 'Internal server error' })
  }
}

const sendMessage = async (req, res) => {
  try {
    const userMessage = await userService.sendUserMessage({
      id: req.params,
      message: req.body
    })
    res.status(200).send({ success: true, userMessage })
  } catch (error) {
    if (error.message === 'Invalid ID format') {
      res.status(400).send({ success: false, msg: error.message })
    } else {
      res.status(500).send({ success: false, msg: 'Internal server error' })
    }
  }
}

const getMessage = async (req, res) => {
  try {
    const retrievedMessage = await userService.retrieveUserMessage({
      id: req.params
    })
    res.status(200).send({ success: true, retrievedMessage })
  } catch (error) {
    if (error.message === 'Invalid ID format') {
      res.status(400).send({ success: false, msg: error.message })
    } else {
      res.status(500).send({ success: false, msg: 'Internal server error' })
    }
  }
}

const sendFeedback = async (req, res) => {
  try {
    await userService.sendUserFeedBack({
      id: req.params,
      body: req.body
    })
    res.status(200).send({ success: true })
  } catch (error) {
    if (error.message === 'Invalid ID format') {
      res.status(400).send({ success: false, msg: error.message })
    } else if (error.name === 'ValidationError') {
      res
        .status(400)
        .send({ success: false, msg: 'Please fill in all the required fields' })
    } else {
      res.status(500).send({ success: false, msg: 'Internal server error' })
    }
  }
}

export default {
  register,
  login,
  setDetails,
  fetchDetails,
  suggestions,
  sendMessage,
  getMessage,
  sendFeedback
}
