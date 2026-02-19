import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addCard } from "../../features/cards/cardsApiSlice"
import { closeModal } from "../../features/cards/cardsApiSlice"

import "./card-editor-modal.styles.scss"

export const CardEditorModal = card => {
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
    const payload = {
      meal_name: formState.meal_name,
      carbs: Number(formState.carbs),
      fat: Number(formState.fat),
      protein: Number(formState.protein),
      units: Number(formState.units),
      notes: formState.notes,
    }

    dispatch(addCard(payload))
    dispatch(closeModal())
  }

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <div className="modal-overlay">
      <div className="card-editor-modal">
        <h2>{id ? "Edit Meal" : "Create new Meal"}</h2>

        <div className="card-editor-modal__form">
          <label>Meal Name</label>
          <input
            name="meal_name"
            onChange={e => {
              handleChange(e)
            }}
            placeholder="Meal Name"
            value={meal_name ?? ""}
          />
          <label>Carbs</label>
          <input
            name="carbs"
            onChange={e => handleChange(e)}
            placeholder="Carbs"
            value={carbs ?? ""}
          />
          <label>Fat</label>
          <input
            name="fat"
            onChange={e => handleChange(e)}
            placeholder="Fat"
            value={fat ?? ""}
          />
          <label>Protein</label>
          <input
            name="protein"
            onChange={e => handleChange(e)}
            placeholder="Protein"
            value={protein ?? ""}
          />
          <label>Units</label>
          <input
            name="units"
            onChange={e => handleChange(e)}
            placeholder="Units"
            value={units ?? ""}
          />
          <label>Notes</label>
          <textarea
            name="notes"
            onChange={e => handleChange(e)}
            placeholder="Notes"
            value={notes ?? ""}
          />
        </div>

        <div className="card-editor-modal__actions">
          <div className="left-actions">
            {id && <button className="btn-delete">Delete</button>}
          </div>

          <div className="right-actions">
            <button className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
