import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import noteRoutes from './routes/note.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use('/auth', authRoutes)
app.use('/', noteRoutes)

app.use('/*', (req, res) => {
  res.status(404).send("<h1>Page Not Found<h1>")
})

const port = 8000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})