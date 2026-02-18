import { useState } from "react"
import { Link } from "react-router"
import { useAppSelector } from "../../app/hooks"

import { ProfileDropdown } from "../profile-dropdown/profile-dropdown.component"

import "./navigation.styles.scss"

export const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const currentUser = useAppSelector(state => state.user.currentUser)

  return (
    <header className="nav">
      <Link to="/" className="nav__logo">
        🥦 Macro Diary
      </Link>

      <div className="nav__right">
        {currentUser ? (
          <div className="nav__profile">
            <button
              className="nav__profile-btn"
              onClick={() => {
                setDropdownOpen(prev => !prev)
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              Profile
            </button>

            {dropdownOpen && (
              <div className="nav__dropdown">
                <ProfileDropdown
                  handleDropdownUpdate={() => {
                    setDropdownOpen(false)
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className="nav__auth-link">
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}
