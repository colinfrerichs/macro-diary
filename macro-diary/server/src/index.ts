import cors from "cors"
import express from "express"
import dotenv from "dotenv"

import { authenticateJWT } from "./middleware/auth.middleware"

import cardRouter from "./routes/cards.route"
import sessionRouter from "./routes/session.route"
import userRouter from "./routes/users.route"

const app = express()
const PORT = 5000

dotenv.config()

app.use(cors({
  origin: "http://localhost:5173",
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

// Routes
app.use("/api/users", userRouter)
app.use("/api/session", sessionRouter)
app.use("/api/cards", authenticateJWT, cardRouter)
