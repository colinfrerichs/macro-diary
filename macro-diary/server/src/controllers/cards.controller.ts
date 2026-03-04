import { Request, Response } from "express"
import { addCardService, deleteCardService, getCardsService, updateCardService } from "../services/cards.service"

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: Function) => Promise.resolve(fn(req, res, next)).catch(next)

export const addCard = asyncHandler(async (req: Request, res: Response) => {
    const newCard = {
        ...req.body,
        user_id: req.user.userId,
    }

    const createdCard = await addCardService(newCard)
    res.status(201).json(createdCard)
})

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
    const { card_id } = req.params
    const card = req.body
    const user_id = req.user.userId;

    console.log(card_id, card, user_id)

    if (!card_id || !user_id) {
        return res.status(400).json({message: "Missing card_id or user_id."})
    }

    const deletedCard = await deleteCardService(card_id, card, user_id)
    
    res.status(200).json(deletedCard)
})

export const getCards = asyncHandler(async (req: Request, res: Response) => {
    const user_id = req.user.userId;

    const cards = await getCardsService(user_id)
    res.status(200).json(cards)
})

export const updateCard = asyncHandler(async (req: Request, res: Response) => {
    const { card_id } = req.params
    
    if (!card_id) {
        return res.status(400).json({message: "Missing card_id."})
    }

    const updatedCard = await updateCardService(req.user.userId, card_id, req.body)
    res.status(200).json(updatedCard)
})
