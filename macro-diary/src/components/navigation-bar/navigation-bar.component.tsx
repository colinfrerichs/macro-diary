import { Link } from "react-router"
import type { User } from "@supabase/supabase-js"

type NavigationBarProps = {
  currentUser: User | null
}

export const NavigationBar = ({ currentUser }: NavigationBarProps) => {
  return (
    <header>
      <Link to="/">Macro Diary</Link>

      {currentUser ? <h1>Hello</h1> : <Link to="/auth">"Sign In"</Link>}
    </header>
  )
}
