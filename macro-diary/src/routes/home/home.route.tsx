import { Card } from "../../components/card/card.component"

import "./home.styles.scss"

export const Home = () => {
  const cardTestData = [
    {
      id: 1,
      user_id: 1,
      meal_name: "broccoli",
      protein: 0,
      carbs: 0,
      fat: 0,
      created_at: "12-12-12",
    },
    {
      id: 2,
      user_id: 1,
      meal_name: "carrots",
      protein: 0,
      carbs: 0,
      fat: 0,
      created_at: "12-12-12",
    },
    {
      id: 3,
      user_id: 1,
      meal_name: "meat",
      protein: 0,
      carbs: 0,
      fat: 0,
      created_at: "12-12-12",
    },
    {
      id: 4,
      user_id: 1,
      meal_name: "rice",
      protein: 0,
      carbs: 0,
      fat: 0,
      created_at: "12-12-12",
    },
    {
      id: 5,
      user_id: 1,
      meal_name: "whatever",
      protein: 0,
      carbs: 0,
      fat: 0,
      created_at: "12-12-12",
    },
  ]

  return (
    <div className="card-container">
      <h1>Cards</h1>

      <div className="card-container__controls">
        <input
          type="text"
          placeholder="Search meals..."
          className="card-container__filter"
        />
      </div>

      <div className="card-grid">
        {cardTestData.map(card => (
          <Card key={card.id} card={card} />
        ))}

        <div
          className="card add-card"
          onClick={() => console.log("Create new card")}
        >
          <span className="plus">+</span>
          <p>Add New</p>
        </div>
      </div>
    </div>
  )
}
