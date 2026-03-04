import { Router } from "express"
import { addCard, deleteCard, getCards, updateCard } from "../controllers/cards.controller"

const router = Router()

router.get("/", getCards)
router.post("/", addCard)
router.put("/:card_id", updateCard)
router.delete("/:card_id", deleteCard)

export default router
