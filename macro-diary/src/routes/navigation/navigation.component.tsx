import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Outlet } from "react-router"

import { onAuthStateChangedListener } from "../../utils/supabase/supabase.utils"
import { setCurrentUser } from "../../features/user/userApiSlice"

export const Navigation = () => {
  const currentUser = useAppSelector(state => state.user.currentUser)
  const dispatch = useAppDispatch()

  console.log(currentUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((_, session) => {
      dispatch(setCurrentUser(session?.user ?? null))
    })

    return unsubscribe
  }, [dispatch])

  return (
    <div>
      <h1>I am the navigation bar.</h1>
      <Outlet />
    </div>
  )
}
