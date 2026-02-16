import cors from "cors"
import express from "express"

import userRouter from "./routes/auth.route"

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

// Routes
app.use("/api/auth", userRouter)
