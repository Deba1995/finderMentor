import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

// Create the Express application
const app = express()
const userSocketMap = {}
const server = http.createServer(app)
const io = new Server(server)

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  // console.log('A user has connected', socket.id)

  const userId = socket.handshake.query.userId
  if (userId !== 'undefined') userSocketMap[userId] = socket.id
  socket.on('disconnect', () => {
    // console.log('User disconnected', socket.id)
  })
})

export { app, io, server }
