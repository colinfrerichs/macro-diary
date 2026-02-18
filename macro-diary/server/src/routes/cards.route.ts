import { Router } from "express"
import { getCards, addCard } from "../controllers/cards.controller"

const router = Router()

router.get("/", getCards)
router.post("/", addCard)

export default router
