import cors from "cors"
import express from "express"
import dotenv from "dotenv"

import { authenticateJWT } from "./middleware/auth.middleware"

import authRouter from "./routes/auth.route"
import cardRouter from "./routes/cards.route"

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
app.use("/api/auth", authRouter)
app.use("/api/user", authenticateJWT, cardRouter)
