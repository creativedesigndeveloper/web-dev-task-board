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
    <div className="bg-bg-primary min-h-screen">
      <div className=" text-text-primary max-w-180 mx-auto">
        <h1 className="font-bold text-center p-5 text-4xl">Web Dev Task Board</h1>
        <form onSubmit={handleSubmit} className="bg-bg-secondary text-center items-center my-50 rounded-2xl px-10 py-5">
          <div>
            <h4 className="pb-2">Email</h4>
            <input value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email" className="bg-bg-primary border border-purple-500 rounded-2xl px-2" />
          </div>
          <div>
            <h4 className="my-2">Password</h4>
            <input value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
              className="bg-bg-primary border border-purple-500 rounded-2xl px-2"
            />
          </div>
          <div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div>
            <button type="submit" className="my-4 bg-purple-accent px-7 rounded-2xl cursor-pointer">Login</button>
          </div>
          <p onClick={() => navigate('/register')} className="cursor-pointer text-purple-accent">Don't have an account? Sign up here</p>
        </form>
      </div>

    </div>
  )
}

export default LoginPage