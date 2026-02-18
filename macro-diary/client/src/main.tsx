// Libraries Single
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { StrictMode, useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import { useAppDispatch } from "./app/hooks"

import { setCurrentUser } from "./features/user/userApiSlice"

import { AuthRoute } from "./routes/authentication/authentication.route"
import { Navigation } from "./routes/navigation/navigation.route"
import { Dashboard } from "./routes/dashboard/dashboard.route"
import { PublicOnlyRoute } from "./routes/public-route/public-only-route.route"
import { ProtectedRoute } from "./routes/protected-route/protected-route.route"

import { store } from "./app/store"

import "./index.scss"

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <PublicOnlyRoute />,
    children: [{ index: true, element: <AuthRoute /> }],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Navigation />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/profile",
            element: <h1>Profile page.</h1>,
          },
        ],
      },
    ],
  },
])

const container = document.getElementById("root")

const AppRoot = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        dispatch(setCurrentUser({ id: payload.userId, email: payload.email }))
      } catch {
        localStorage.removeItem("token")
      }
    }
  }, [dispatch])

  return <RouterProvider router={router} />
}

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
