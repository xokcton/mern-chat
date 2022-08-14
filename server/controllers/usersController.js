import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

const negativeResponse = (error) => {
  res.status(404).json({ message: `Something went wrong! ${error.message}` })
  next(error)
}

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck) return res.json({ message: "Username already used!", status: false })

    const emailCheck = await User.findOne({ email })
    if (emailCheck) return res.json({ message: "Email already used!", status: false })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    delete user.password
    return res.status(201).json({ user, status: true })
  } catch (error) {
    negativeResponse(error)
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const WRONG_ATTRIBUTES = { message: "Incorrect username or password!", status: false }
    const user = await User.findOne({ username })
    if (!user) return res.json(WRONG_ATTRIBUTES)

    const comparePasswords = await bcrypt.compare(password, user.password)
    if (!comparePasswords) return res.json(WRONG_ATTRIBUTES)

    delete user.password
    return res.status(201).json({ user, status: true })
  } catch (error) {
    negativeResponse(error)
  }
}

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage
    })

    const response = {
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    }
    return res.json(response)
  } catch (error) {
    negativeResponse(error)
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.params.id
    const users = await User.find({ _id: { $ne: currentUserId } }).select([
      "email", "username", "avatarImage", "_id"
    ])

    return res.json(users)
  } catch (error) {
    negativeResponse(error)
  }
}