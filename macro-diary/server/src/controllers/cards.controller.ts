import { Request, Response } from "express"
import { addCardByUserId, findCardsByUserId, updateCardById } from "../models/cards.model"

export const getCards = async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "No authenticated user." })

    try {
        const cards = await findCardsByUserId({user_id: req.user.userId})
        
        return res.status(200).json(cards)
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve cards" })
    }
}

export const addCard = async(req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "No authenticated user." })

    const card = req.body

    if (!card) return res.status(401).json({message: "Missing card for update."})

    const newCard = {
        ...card,
        user_id: req.user.userId
    }

    try {
        const createdCard = await addCardByUserId(newCard)
        
        return res.status(201).json(createdCard)
    } catch (error) {
        return res.status(500).json({ message: "Failed to create new card." })
    }
}

export const updateCard = async(req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "no authenticated user." })

    const card = req.body

    if (!card) return res.status(401).json({ message: "Missing card to update." })

    try {
        const { card_id } = req.params
        const updatedCard = await updateCardById(card_id, req.body)
        
        return res.status(200).json(updatedCard)
    } catch (error) {
        return res.status(500).json({ message: "Failed to update card." })
    }
}
