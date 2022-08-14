import Message from '../models/messageModel.js'

export const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from
    })

    if (data) return res.json({ message: "Message added successfully." })
    return res.json({ message: "Failed to add message to the database." })
  } catch (error) {
    res.json({ message: `Something went wrong!` })
    next(error)
  }
}

export const getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body
    const response = await Message.find({
      users: {
        $all: [from, to]
      }
    }).sort({ updatedAt: 1 })
    const messages = response.map(msg => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
      createdAt: msg.createdAt,
    }))

    return res.json(messages)
  } catch (error) {
    res.status(404).json({ message: `Something went wrong!` })
    next(error)
  }
}