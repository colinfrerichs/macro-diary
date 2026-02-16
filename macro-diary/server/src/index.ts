import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import cardsRouter from "./routes/cards"

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

// Routes
app.use("/api/cards", cardsRouter)
