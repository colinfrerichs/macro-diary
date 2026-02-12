type AuthenticationFormProps = {
  username: string
  password: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  error?: string
  submitText: string
}

export const AuthenticationForm = ({
  username,
  password,
  onChange,
  onSubmit,
  error,
  submitText,
}: AuthenticationFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        onChange={onChange}
        type="text"
        value={username}
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
