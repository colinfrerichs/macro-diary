// Libraries Single
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { StrictMode } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"

import { AuthRoute } from "./routes/authentication/authentication.route"
import { Navigation } from "./routes/navigation/navigation.route"
import { Home } from "./routes/home/home.route"
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
            element: <Home />,
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
