type AuthenticationFormProps = {
  email: string
  password: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  error?: string
  submitText: string
}

export const AuthenticationForm = ({
  email,
  password,
  onChange,
  onSubmit,
  error,
  submitText,
}: AuthenticationFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Username:</label>
      <input
        id="email"
        name="email"
        onChange={onChange}
        type="text"
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        onChange={onChange}
        type="password"
        value={password}
      />

      {error && <p>{error}</p>}
      <button type="submit">{submitText}</button>
    </form>
  )
}
