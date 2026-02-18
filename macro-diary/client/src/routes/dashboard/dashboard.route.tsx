import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { getCards } from "../../features/cards/cardsApiSlice"

import { Card } from "../../components/card/card.component"
import { CardEditorModal } from "../../components/card-editor-modal/card-editor-modal.component"

import "./dashboard.styles.scss"

export const Dashboard = () => {
  const { cards, selectedCard, isModalOpen } = useAppSelector(
    state => state.cards,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  return (
    <div className="card-container">
      {isModalOpen && (
        <div className="card-editor-modal">
          <CardEditorModal card={selectedCard} />
        </div>
      )}
      <h1>Cards</h1>
      <div className="card-container__controls">
        <input
          type="text"
          placeholder="Search meals..."
          className="card-container__filter"
        />
      </div>
      <div className="card-grid">
        {cards.length > 0 &&
          cards.map(card => <Card key={card.id} card={card} />)}

        <div
          className="card add-card"
          onClick={() => {
            console.log("card clicked")
          }}
        >
          <span className="plus">+</span>
          <p>Add New</p>
        </div>
      </div>
    </div>
  )
}
