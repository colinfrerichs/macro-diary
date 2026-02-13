import { useAppSelector } from "../../app/hooks"
import { Outlet } from "react-router"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar.component"

export const Navigation = () => {
  const currentUser = useAppSelector(state => state.user.currentUser)

  return (
    <div>
      <NavigationBar currentUser={currentUser} />
      <Outlet />
    </div>
  )
}
