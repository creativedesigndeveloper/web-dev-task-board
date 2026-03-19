import { useState } from "react"
import { setCredentials } from "@/store/authSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(email, password)
    const mockUser = { id: 1, name: "Test User", email }
    const mockToken = "mock-jwt-token-123"
    dispatch(setCredentials({
      user: mockUser,
      token: mockToken
    }))
    navigate('/dashboard')

    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h4>Email</h4>
          <input value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email" />
        </div>
        <div>
          <h4>Password</h4>
          <input value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default LoginPage