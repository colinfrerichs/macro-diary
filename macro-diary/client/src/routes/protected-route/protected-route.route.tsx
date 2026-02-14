import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../../app/hooks"

export const ProtectedRoute = () => {
  const currentUser = useAppSelector(state => state.user.currentUser)

  if (!currentUser) return <Navigate to="/auth" replace />

  return <Outlet />
}
