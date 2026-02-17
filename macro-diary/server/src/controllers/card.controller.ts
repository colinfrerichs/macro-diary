import { Request, Response } from "express"
import { findCardsByUserId } from "../models/cards.model"

export const getCards = async (req: Request, res: Response) => {
    if (!req.user) return res.status(401).json({ message: "No authenticated user." })

    const cards = await findCardsByUserId({user_id: req.user.userId})
    return res.status(200).json(cards)
}
