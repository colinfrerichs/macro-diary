import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { addCard, getCards } from "../../features/cards/cardsApiSlice"

import { Card } from "../../components/card/card.component"
import { CardEditorModal } from "../../components/card-editor-modal/card-editor-modal.component"

import "./dashboard.styles.scss"

export const Dashboard = () => {
  const { cards, status, error } = useAppSelector(state => state.cards)
  const dispatch = useAppDispatch()

  // UI State -> here because it's only used on the dashboard.
  const [query, setQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const filteredCards = useMemo(() => {
    return cards.filter(card =>
      card.meal_name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [cards, query])

  const handleOpen = card => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setSelectedCard({})
  }

  const handleSave = card => {
    if (card.id) {
      // dispatch(updateCard(formState))
      console.log("hit the update - nice")
    } else {
      const payload = {
        meal_name: card.meal_name,
        carbs: Number(card.carbs),
        fat: Number(card.fat),
        protein: Number(card.protein),
        units: Number(card.units),
        notes: card.notes,
      }

      dispatch(addCard(payload))

      // Only close if the request is successful - otherwise, put some logic to display an error.
      if (status === "succeeded") {
        setIsModalOpen(false)
      }
    }
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCards())
    }
  }, [dispatch, status])

  return (
    <div className="card-container">
      {isModalOpen && (
        <div>
          <CardEditorModal
            card={selectedCard}
            onClose={handleClose}
            onSave={handleSave}
          />
        </div>
      )}
      <h1>Cards</h1>
      <div className="card-container__controls">
        <input
          className="card-container__filter"
          onChange={e => {
            setQuery(e.target.value)
          }}
          placeholder="Search meals..."
          type="text"
          value={query}
        />
      </div>
      <div className="card-grid">
        {cards.length === 0 ? (
          <p>Start adding cards!</p>
        ) : (
          filteredCards.map(card => (
            <Card key={card.id} card={card} handleOpen={handleOpen} />
          ))
        )}

        <div
          className="card add-card"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          <span className="plus">+</span>
          <p>Add New</p>
        </div>
      </div>
    </div>
  )
}
