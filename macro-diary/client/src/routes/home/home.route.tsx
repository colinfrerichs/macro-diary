import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { getCards } from "../../features/cards/cardsApiSlice"

import { Card } from "../../components/card/card.component"
import { CardEditorModal } from "../../components/card-editor-modal/card-editor-modal.component"

import "./home.styles.scss"

export const Home = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const isModalOpen = useAppSelector(state => state.cards.isModalOpen)

  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  return (
    <div className="card-container">
      {isModalOpen && (
        <div className="card-editor-modal">
          <CardEditorModal />
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
