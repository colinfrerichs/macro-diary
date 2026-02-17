import { useNavigate } from "react-router"
import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"

import { signUserIn, signUserUp } from "../../features/user/userApiSlice"

import { AuthenticationForm } from "../../components/authentication-form/authentication-form.component"

import "./authentication.styles.scss"

type AuthFormFields = {
  email: string
  password: string
}

const initialAuthFormState = {
  email: "",
  password: "",
}

export const AuthRoute = () => {
  const [formFields, setFormFields] =
    useState<AuthFormFields>(initialAuthFormState)
  const [isSignUp, setIsSignUp] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { email, password } = formFields
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const authFlow = async () => {
    try {
      const authResponse = isSignUp
        ? await dispatch(signUserUp({ email, password })).unwrap()
        : await dispatch(signUserIn({ email, password })).unwrap()

      const user = authResponse.user

      if (!user) {
        setError(
          isSignUp
            ? "Unable to create user. Try again later."
            : "Unable to sign user in. Try again later.",
        )
        return null
      }

      navigate("/", { replace: true })
      return user
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      return null
    }
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    void authFlow()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormFields(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <div className="authentication-form-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🥦 Macro Diary</h1>
          <p>
            A smarter way to visualize and organize the macros for your meals.
            Track protein, carbs, and fats with clarity and control.
          </p>
        </div>
        <AuthenticationForm
          email={email}
          password={password}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error ?? ""}
          submitText={isSignUp ? "Sign Up" : "Sign In"}
        />
        <div className="auth-toggle">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
            }}
          >
            {isSignUp
              ? "Already have an account? Sign In."
              : "Don't have an account? Sign Up."}
          </button>
        </div>
      </div>
    </div>
  )
}
