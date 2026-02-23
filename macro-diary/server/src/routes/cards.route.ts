import { Router } from "express"
import { getCards, addCard } from "../controllers/cards.controller"
import { updateCard } from "../models/cards.model"

const router = Router()

router.get("/", getCards)
router.post("/", addCard)
router.put("/:card_id", updateCard)

export default router
