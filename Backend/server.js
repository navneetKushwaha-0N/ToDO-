import express      from 'express'
import dotenv       from 'dotenv'
import cors         from 'cors'
import connectDB    from './config/db.js'
import todoRoutes   from './routes/todoRoutes.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config()   // ← sabse pehle
connectDB()       // ← DB connect

const app = express()
const PORT = process.env.PORT ?? 7560

app.use(cors({ origin: 'http://localhost:5173' , 'https://todo-frontend-c1tk.onrender.com'}))
app.use(express.json())

app.use('/api/todos', todoRoutes)

app.use((req, res) => {
  res.status(404).json({ msg: `Route nahi mili: ${req.originalUrl}` })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is live ${PORT}`)
})