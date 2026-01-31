import { io } from 'socket.io-client'

export const socket = io({
  autoConnect: false,
  path: '/socket.io',
  reconnectionAttempts: 5,
  timeout: 10000,
})
