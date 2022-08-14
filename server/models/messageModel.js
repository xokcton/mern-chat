import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true,
      min: 1,
    }
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  }
}, {
  timestamps: true
})

export default mongoose.model('Messages', messageSchema)
