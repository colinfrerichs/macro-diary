import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import {
  addCard,
  deleteCard,
  updateCard,
} from "../../features/cards/cardsApiSlice"

import "./card-editor-modal.styles.scss"

export const CardEditorModal = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cards = useAppSelector(state => state.cards.cards)
  const existingCard = cards.find(card => card.id === id)

  const [formState, setFormState] = useState(existingCard ?? {})
  const isEditMode = Boolean(id)

  useEffect(() => {
    if (existingCard) {
      setFormState(existingCard)
    }
  }, [existingCard])

  const handleChange = event => {
    const { name, value } = event.target

    setFormState(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleDelete = async () => {
    await dispatch(deleteCard)
  }

  const handleSave = async () => {
    if (isEditMode) {
      await dispatch(updateCard(formState))
    } else {
      await dispatch(addCard(formState))
    }

    navigate("/")
  }

  const handleCancel = () => {
    navigate("/")
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
            value={formState.meal_name ?? ""}
          />
          <label>Carbs</label>
          <input
            name="carbs"
            onChange={e => handleChange(e)}
            placeholder="Carbs"
            value={formState.carbs ?? ""}
          />
          <label>Fat</label>
          <input
            name="fat"
            onChange={e => handleChange(e)}
            placeholder="Fat"
            value={formState.fat ?? ""}
          />
          <label>Protein</label>
          <input
            name="protein"
            onChange={e => handleChange(e)}
            placeholder="Protein"
            value={formState.protein ?? ""}
          />
          <label>Units</label>
          <input
            name="units"
            onChange={e => handleChange(e)}
            placeholder="Units"
            value={formState.units ?? ""}
          />
          <label>Notes</label>
          <textarea
            name="notes"
            onChange={e => handleChange(e)}
            placeholder="Notes"
            value={formState.notes ?? ""}
          />
        </div>

        <div className="card-editor-modal__actions">
          <div className="left-actions">
            {id && (
              <button className="btn-delete" onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>

          <div className="right-actions">
            <button className="btn-cancel" onClick={handleCancel}>
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
