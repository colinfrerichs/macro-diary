// Libraries Single
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { StrictMode } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"

import { App } from "./App"
import { AuthRoute } from "./routes/authentication/authentication.route"
import { Navigation } from "./routes/navigation/navigation.route"

import { store } from "./app/store"

import "./index.css"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <App /> },
      { path: "/auth", element: <AuthRoute /> },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
