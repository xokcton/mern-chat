import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    min: 8,
    max: 72,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false
  },
  avatarImage: {
    type: String,
    default: ""
  },
}, {
  timestamps: true
})

export default mongoose.model('Users', userSchema)
