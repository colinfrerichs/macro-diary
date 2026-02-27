import { Router } from "express"
import { addCard, getCards } from "../controllers/cards.controller"
import { deleteCard, updateCard } from "../controllers/cards.controller"

const router = Router()

router.get("/", getCards)
router.post("/", addCard)
router.put("/:card_id", updateCard)
router.delete("/:card_id", deleteCard)

export default router
