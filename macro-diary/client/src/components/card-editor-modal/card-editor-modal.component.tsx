import { useEffect, useState } from "react"

import "./card-editor-modal.styles.scss"

export const CardEditorModal = ({ card, onClose, onSave }) => {
  const [formState, setFormState] = useState(card)

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
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn-save"
              onClick={() => {
                onSave(formState)
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
