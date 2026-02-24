import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Outlet, useNavigate } from "react-router-dom"

import { getCards } from "../../features/cards/cardsApiSlice"

import { Card } from "../../components/card/card.component"

import "./dashboard.styles.scss"

export const Dashboard = () => {
  const { cards, status } = useAppSelector(state => state.cards)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // UI State -> here because it's only used on the dashboard.
  const [query, setQuery] = useState("")

  const filteredCards = useMemo(() => {
    return cards.filter(card =>
      card.meal_name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [cards, query])

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCards())
    }
  }, [dispatch, status])

  return (
    <div className="card-container">
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
          filteredCards.map(card => <Card key={card.id} card={card} />)
        )}

        <div
          className="card add-card"
          onClick={() => {
            navigate("/cards/new")
          }}
        >
          <span className="plus">+</span>
          <p>Add New</p>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
