import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"

import {
  signUserIn,
  signUserUp,
  createNewUserProfile,
} from "../../features/user/userApiSlice"

import { AuthenticationForm } from "../../components/authentication-form/authentication-form.component"

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    void submitForm()
  }

  const submitForm = async () => {
    const authResponse = await dispatch(
      isSignUp
        ? signUserUp({ email, password })
        : signUserIn({ email, password }),
    ).unwrap()

    const user = authResponse.user

    if (!user) {
      setError(
        isSignUp
          ? "Unable to create user. Try again later."
          : "Unable to sign user in. Try again later.",
      )
    } else {
      await dispatch(createNewUserProfile(user))
    }
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
    <div>
      <AuthenticationForm
        email={email}
        password={password}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error ?? ""}
        submitText={isSignUp ? "Sign Up" : "Sign In"}
      />
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
  )
}
