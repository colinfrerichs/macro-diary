import { Router } from "express"

import { getCards } from "../controllers/card.controller"

const router = Router()

router.get("/cards", getCards)

export default router
