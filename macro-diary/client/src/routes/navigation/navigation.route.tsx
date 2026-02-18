import { Outlet } from "react-router"

import { NavigationBar } from "../../components/navigation-bar/navigation-bar.component"

export const Navigation = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  )
}
