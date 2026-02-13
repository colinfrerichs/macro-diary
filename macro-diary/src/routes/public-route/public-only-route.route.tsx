import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../../app/hooks"

export const PublicOnlyRoute = () => {
  const currentUser = useAppSelector(state => state.user.currentUser)

  if (currentUser) return <Navigate to="/" replace />

  return <Outlet />
}
