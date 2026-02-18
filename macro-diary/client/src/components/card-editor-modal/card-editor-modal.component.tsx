import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addCard } from "../../features/cards/cardsApiSlice"

import "./card-editor-modal.styles.scss"

export const CardEditorModal = ({ card, onClose }) => {
  const [formState, setFormState] = useState(card)
  const dispatch = useAppDispatch()

  const { id, meal_name, carbs, fat, notes, protein, units } = formState

  useEffect(() => {
    setFormState(card)
  }, [card])

  const handleChange = event => {
    const { name, value } = event.target

    setFormState(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleSave = () => {
    // if (formState.id) {
    //   dispatch(updateCard(formState))
    // } else {
    // }
    dispatch(addCard(formState))
  }

  return (
    <div className="modal-overlay">
      <div className="card-editor-modal">
        <h2>{formState.id ? "Edit Meal" : "Create new Meal"}</h2>

        <div className="card-editor-modal__form">
          <input
            onChange={e => handleChange(e)}
            placeholder="Meal Name"
            value={formState?.meal_name ?? ""}
          />
          <input
            onChange={e => handleChange(e)}
            placeholder="Carbs"
            value={formState?.carbs ?? ""}
          />
          <input
            onChange={e => handleChange(e)}
            placeholder="Fat"
            value={formState?.fat ?? ""}
          />
          <input
            onChange={e => handleChange(e)}
            placeholder="Protein"
            value={formState?.protein ?? ""}
          />
          <input
            onChange={e => handleChange(e)}
            placeholder="Units"
            value={formState?.units ?? ""}
          />
          <input
            onChange={e => handleChange(e)}
            placeholder="Notes"
            value={formState?.notes ?? ""}
          />
        </div>

        <div className="card-editor-modal__actions">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
