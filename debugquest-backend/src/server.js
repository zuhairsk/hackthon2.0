import express from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

import authRouter from './routes/auth.js'
import debugRouter from './routes/debug.js'
import historyRouter from './routes/history.js'
import leaderboardRouter from './routes/leaderboard.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true },
})

io.on('connection', (socket) => {
})

app.set('io', io)

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRouter)
app.use('/api/debug', debugRouter)
app.use('/api/history', historyRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

async function connectMongo() {
  const mongoUri = process.env.MONGO_URI
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri)
      console.log('Connected to MongoDB')
      return
    } catch (e) {
      console.warn('Mongo connection failed, falling back to in-memory:', e.message)
    }
  }
  // fallback
  const { MongoMemoryServer } = await import('mongodb-memory-server')
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  await mongoose.connect(uri)
  console.log('Connected to in-memory MongoDB')
}

async function start() {
  const port = process.env.PORT || 5000
  await connectMongo()
  server.listen(port, () => {
    console.log(`Server listening on ${port}`)
  })
}

start().catch((e) => {
  console.error('Failed to start:', e)
  process.exit(1)
})