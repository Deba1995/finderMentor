import { User, Chat, Message, Feedback } from '../models/index.js'
import mongoose from 'mongoose'
import { genPassword, validPassword, issueJWT } from '../utils/helper.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

const registerUser = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email })

  if (existingUser) {
    throw new Error('The email is already in use')
  }
  if (payload.password.length < 5) {
    throw new Error('Password must be at least 5 characters long')
  }

  const saltHash = genPassword(payload.password)
  const salt = saltHash.salt
  const hash = saltHash.hash
  const newUser = new User({
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    role: payload.role,
    hash,
    salt
  })
  const savedUser = await newUser.save()
  // Return the saved user
  return savedUser
}
const loginUser = async (payload) => {
  const ifExistUser = await User.findOne({ email: payload.email })
  if (!ifExistUser) throw new Error('Could not find that email')

  const isValidPassword = validPassword(
    payload.password,
    ifExistUser.hash,
    ifExistUser.salt
  )

  if (!isValidPassword) throw new Error('You entered the wrong password')

  const tokenObject = issueJWT(ifExistUser)

  return tokenObject
}
const detailsUser = async (payload) => {
  const { id } = payload.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format')
  }
  const details = payload.body
  const updatedDetails = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        ...details,
        details: true
      }
    },
    {
      new: true
    }
  )
  if (!updatedDetails) {
    throw new Error('User not found')
  }
  return updatedDetails
}
const getDetailsUser = async (payload) => {
  const { id } = payload.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format')
  }
  const userDetails = await User.findById(id)
  if (!userDetails) {
    throw new Error('User not found')
  }
  return userDetails
}
const getSuggestions = async (payload) => {
  const { id } = payload.id
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format')
    }

    const userDetails = await User.findById(id)
    if (!userDetails) {
      throw new Error('User not found')
    }
    const roleUser = userDetails.role
    // Define the filter criteria
    const filterCriteria = {
      _id: { $ne: id },
      role: { $ne: roleUser }
    }

    const users = await User.find(filterCriteria)

    const scoredUsers = []

    for (const user of users) {
      let score = 0

      // Skills
      const skillMatches = userDetails.skills.filter((skill) =>
        user.skills.includes(skill)
      )
      score += (skillMatches.length / userDetails.skills.length) * 80

      // Experience
      if (userDetails.experience.includes(user.experience)) {
        score += 40
      }

      // Interests
      const interestMatches = userDetails.interests.filter((interest) =>
        user.interests.includes(interest)
      )
      score += (interestMatches.length / userDetails.interests.length) * 20

      // Availability
      if (userDetails.availability.includes(user.availability)) {
        score += 4
      }

      // Location
      if (userDetails.location === user.location) {
        score += 10
      }

      if (score > 0) {
        scoredUsers.push({ user, score })
      }
    }

    // Sort the scoredUsers array by score in descending order
    scoredUsers.sort((a, b) => b.score - a.score)

    const sortedUsers = scoredUsers.map((item) => ({
      user: item.user,
      score: Math.min(Math.floor(item.score), 100)
    }))

    return sortedUsers
  } catch (error) {
    console.log(error)
  }
}
const getMessageUsers = async (payload) => {
  const { id } = payload.id
  const chats = await Chat.find({
    participants: {
      $in: [id]
    }
  })

  const receiverProfilePromises = chats.map(async (chat) => {
    // Find the receiver's ID (not equal to loggedInUserId)
    const receiverId = chat.participants.find(
      (participantId) => participantId.toString() !== id
    )

    const receiverProfile = await User.findById(receiverId)

    return receiverProfile
  })
  const receiverProfiles = await Promise.all(receiverProfilePromises)
  return receiverProfiles
}
const retrieveUserMessage = async (payload) => {
  const { senderId, receiverId } = payload.id
  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new Error('Invalid ID format')
  }
  const chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] }
  }).populate('messages')

  if (!chat) return []
  return chat.messages
}
const sendUserMessage = async (payload) => {
  const { senderId, receiverId } = payload.id
  const { message } = payload.message
  if (
    !mongoose.Types.ObjectId.isValid(receiverId) ||
    !mongoose.Types.ObjectId.isValid(senderId)
  ) {
    throw new Error('Invalid ID format')
  }

  let chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] }
  })

  if (!chat) {
    chat = await Chat.create({
      participants: [senderId, receiverId]
    })
  }
  const newMessage = new Message({
    senderId,
    receiverId,
    message
  })

  if (newMessage) {
    chat.messages.push(newMessage._id)
  }

  await Promise.all([chat.save(), newMessage.save()]) // For optimisation run parallely

  // SOCKET IO FUNCTIONALITY A.K.A REAL TIME COMMUNICATION
  const receiverSocketId = getReceiverSocketId(receiverId)
  if (receiverSocketId) {
    console.log(receiverId)
    console.log('emit')
    io.to(receiverSocketId).emit('newMessage', newMessage)
  }

  return newMessage
}
const sendUserFeedBack = async (payload) => {
  const { id } = payload.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format')
  }

  const feedback = payload.body
  const newFeedback = new Feedback({
    feedBackId: id,
    feedBack: feedback.feedBack
  })
  const saveFeedback = await newFeedback.save()
  return saveFeedback
}

export default {
  registerUser,
  loginUser,
  detailsUser,
  getDetailsUser,
  getSuggestions,
  sendUserMessage,
  retrieveUserMessage,
  getMessageUsers,
  sendUserFeedBack
}
