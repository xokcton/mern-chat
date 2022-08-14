import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'

import connect from './database/mongodb.js'
import userRoutes from './routes/userRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'

const app = express()
const { PORT, MONGO_URL, CLIENT_URL } = process.env

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)
app.use('/api/messages', messagesRoutes)


const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  connect(MONGO_URL)
})

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  }
})

global.onlineUsers = new Map()
io.on("connection", socket => {
  global.chatSocket = socket

  socket.on("add-user", userId => {
    onlineUsers.set(userId, socket.id)
  })

  socket.on("send-msg", data => {
    const sendUserSocket = onlineUsers.get(data.to)
    if (sendUserSocket) socket.to(sendUserSocket).emit("receive-msg", data.message)
  })
})