import { useState } from "react"
import { setCredentials } from "@/store/authSlice"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useNavigate } from "react-router-dom"
import { signInUser } from "@/api/authApi"

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { user, token } = await signInUser(email, password)
      dispatch(setCredentials({
        user: {
          id: user.uid,
          email: user.email ?? '',
          name: user.displayName ?? ''
        },
        token
      }))
      navigate('/dashboard')
      setEmail('')
      setPassword('')
    } catch (err) {
      setError('Invalid email or password, please try again')
    }
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <p onClick={() => navigate('/register')} className="cursor-pointer text-purple-accent">Don't have an account? Sign up here</p>
      </form>
    </div>
  )
}

export default LoginPage