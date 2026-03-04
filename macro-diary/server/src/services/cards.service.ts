import { addCardByUserId, deleteCardById, findCardsByUserId, updateCardById } from "../models/cards.model"

type Card = {
  id: string
  user_id: string
  meal_name: string
  carbs: number
  fat: number
  notes: string
  protein: number
  units: number
  created_at: string
}

// TODO: I should probably add a check to see if the card even exists, first. 

export const addCardService = async (card: Card) => {
    const createdCard = await addCardByUserId(card)

    return createdCard
}

export const deleteCardService = async (card_id, card, user_id) => {
    if (card.user_id === user_id) {
        const response = await deleteCardById(card_id)

        return response
    }
}

export const getCardsService = async (user_id: number) => {
    const cards = await findCardsByUserId(user_id)
    return cards
}

export const updateCardService = async (user_id, card_id, card) => {
    if (card.user_id === user_id) {
        const updatedCard = await updateCardById(card_id, card)

        return updatedCard
    }
}
