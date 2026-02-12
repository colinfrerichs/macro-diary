import { Link } from "react-router"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { signUserOut } from "../../features/user/userApiSlice"

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
    <div>
      <p>{currentUser?.email}</p>
      <ul>
        <li>
          <Link
            to="/profile"
            role="menuitem"
            onClick={() => {
              handleDropdownUpdate()
            }}
          >
            Profile
          </Link>
        </li>
        <li>
          <button onClick={handleSignOut}>Sign out</button>
        </li>
      </ul>
    </div>
  )
}
