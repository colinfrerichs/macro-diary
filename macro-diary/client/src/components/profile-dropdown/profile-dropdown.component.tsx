import { Link } from "react-router"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { signUserOut } from "../../features/user/userApiSlice"

import "./profile-dropdown.styles.scss"

type ProfileDropdownProps = {
  handleDropdownUpdate: () => void
}

export const ProfileDropdown = ({
  handleDropdownUpdate,
}: ProfileDropdownProps) => {
  const currentUser = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    handleDropdownUpdate()
    void signOut()
  }

  const signOut = async () => {
    await dispatch(signUserOut())
  }

  return (
    <div className="profile-dropdown">
      <div className="profile-dropdown__header">
        <p className="profile-dropdown__email">{currentUser?.email}</p>
      </div>
      <ul className="profile-dropdown__menu">
        <li>
          <Link
            to="/profile"
            className="profile-dropdown__item"
            role="menuitem"
            onClick={() => {
              handleDropdownUpdate()
            }}
          >
            Profile
          </Link>
        </li>
        <li>
          <button
            className="profile-dropdown__item profile-dropdown__item--danger"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}
