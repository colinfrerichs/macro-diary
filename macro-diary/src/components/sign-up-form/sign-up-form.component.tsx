import { useState } from "react"

import { createNewUserWithUsernameAndPassword } from "../../utils/supabase/supabase.utils"

type SignUpFields = {
  username: string
  password: string
}

const initialFormFieldState = {
  username: "",
  password: "",
}

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState<SignUpFields>(
    initialFormFieldState,
  )
  const { username, password } = formFields

  const handleFormSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const { user, session } = await createNewUserWithUsernameAndPassword(
      username,
      password,
    )
  }

  const handleFormChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const { name, value } = event.target

    setFormFields(prev => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        onChange={handleFormChange}
        type="text"
        value={username}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        onChange={handleFormChange}
        type="password"
        value={password}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
