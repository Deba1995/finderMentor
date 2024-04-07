import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter first Name']
    },
    lastName: {
      type: String,
      required: [true, 'Please enter last Name']
    },
    imageRef: {
      type: String,
      default: ''
    },
    skills: [String],
    interests: [String],
    experience: [String],
    goals: [String],
    availability: [String],
    location: {
      type: String,
      default: 'unavailable'
    },
    details: {
      type: Boolean,
      default: false
    },
    email: {
      type: String,
      required: [true, 'Please enter email']
    },
    role: {
      type: String,
      required: [true, 'Please select a role']
    },
    hash: String,
    salt: String
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
