import "./card.style.scss"

type CardProps = {
  card: {
    id: number
    user_id: number
    meal_name: string
    carbs: number
    fat: number
    notes: string
    protein: number
    units: number
    created_at: string
  }
}

export const Card = ({ card, handleOpen }: { card: CardProps }) => (
  <div className="card">
    <button
      className="card__edit-btn"
      onClick={() => {
        handleOpen(card)
      }}
    >
      Edit
    </button>

    <h2>{card.meal_name}</h2>

    <div className="macros">
      <span className="macro-pill">Protein {card.protein}g</span>
      <span className="macro-pill">Carbs {card.carbs}g</span>
      <span className="macro-pill">Units {card.units}</span>
    </div>

    <small>{new Date(card.created_at).toLocaleDateString()}</small>
  </div>
)
