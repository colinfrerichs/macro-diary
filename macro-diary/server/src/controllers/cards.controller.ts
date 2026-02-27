import { Request, Response } from "express"
import { addCardByUserId, deleteCardById, findCardsByUserId, updateCardById } from "../models/cards.model"

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: Function) => Promise.resolve(fn(req, res, next)).catch(next)

export const addCard = asyncHandler(async (req: Request, res: Response) => {
    const newCard = {
        ...req.body,
        user_id: req.user.userId,
    }

    const createdCard = await addCardByUserId(newCard)
    res.status(201).json(createdCard)
})

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
    const { card_id } = req.params

    if (!card_id) {
        return res.status(400).json({message: "Missing card_id."})
    }

    const deletedCard = await deleteCardById(card_id)
    
    res.status(200).json(deletedCard)
})

export const getCards = asyncHandler(async (req: Request, res: Response) => {
    const cards = await findCardsByUserId({ user_id: req.user.userId })
    res.status(200).json(cards)
})

export const updateCard = asyncHandler(async (req: Request, res: Response) => {
    const { card_id } = req.params
    
    if (!card_id) {
        return res.status(400).json({message: "Missing card_id."})
    }

    const updatedCard = await updateCardById(card_id, req.body)
    res.status(200).json(updatedCard)
})
