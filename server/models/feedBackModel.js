import mongoose from 'mongoose'

const feedBackSchema = new mongoose.Schema(
  {
    feedBackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    feedBack: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const Feedback = mongoose.model('Feedback', feedBackSchema)

export default Feedback
