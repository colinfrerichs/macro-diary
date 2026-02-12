import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"

import {
  signUserUp,
  createNewUserProfile,
} from "../../features/user/userApiSlice"

import { AuthenticationForm } from "../../components/authentication-form/authentication-form.component"

type AuthFormFields = {
  username: string
  password: string
}

const initialAuthFormState = {
  username: "",
  password: "",
}

export const AuthRoute = () => {
  const [formFields, setFormFields] =
    useState<AuthFormFields>(initialAuthFormState)
  const [isSignUp, setIsSignUp] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { username, password } = formFields

  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    void submitForm()
  }

  const submitForm = async () => {
    const { user } = await dispatch(signUserUp({ username, password })).unwrap()

    if (!user) {
      setError("Unable to create user. Try again later.")
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
        username={username}
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
