
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AI Career Platform API is running!',
  })
})

const startServer = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`)
  })
}

startServer()
