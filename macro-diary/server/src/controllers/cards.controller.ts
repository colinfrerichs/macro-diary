import { Request, Response } from "express"
import { findCardsByUserId, addCardByUserId } from "../models/cards.model"

export const getCards = async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "No authenticated user." })

    const cards = await findCardsByUserId({user_id: req.user.userId})
    return res.status(200).json(cards)
}

export const addCard = async(req: Request, res: Response) => {
    const { card } = req.body;

    if (!req.user) return res.status(401).json({ message: "No authenticated user." })
    if (!card) return res.status(401).json({message: "Missing card for update."})

    const cards = await addCardByUserId(card)
    return res.status(201).json({ cards })
}
