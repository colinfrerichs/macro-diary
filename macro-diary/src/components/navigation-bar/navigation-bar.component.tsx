import { useState } from "react"
import { Link } from "react-router"
import type { User } from "@supabase/supabase-js"

import { ProfileDropdown } from "../profile-dropdown/profile-dropdown.component"

type NavigationBarProps = {
  currentUser: User | null
}

export const NavigationBar = ({ currentUser }: NavigationBarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header>
      <Link to="/">Macro Diary</Link>

      {currentUser ? (
        <div>
          <button
            onClick={() => {
              setDropdownOpen(prev => !prev)
            }}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            Profile
          </button>

          {dropdownOpen && (
            <ProfileDropdown
              handleDropdownUpdate={() => {
                setDropdownOpen(false)
              }}
            />
          )}
        </div>
      ) : (
        <Link to="/auth">"Sign In"</Link>
      )}
    </header>
  )
}
