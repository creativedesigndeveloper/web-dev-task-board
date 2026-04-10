import { registerUser } from "@/api/authApi"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { setCredentials } from "@/store/authSlice"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { user, token } = await registerUser(email, password, name)
      dispatch(setCredentials({
        user: {
          id: user.uid,
          name: user.displayName ?? '',
          email: user.email ?? ''
        },
        token
      }))
      navigate('/dashboard')
      setName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen relative z-10">
      <div className="max-w-100 text-text-primary mx-auto">
        <h1 className="text-center font-bold text-3xl mt-10">Register</h1>
        <form onSubmit={handleSubmit} className="text-center items-center my-50 bg-bg-secondary rounded-3xl p-10">
          <div>
            <h3 className="mb-2">Name</h3>
            <input type="text" className="bg-bg-primary px-4 border border-purple-accent rounded-2xl" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
          </div>
          <div>
            <h3 className="my-2">Email</h3>
            <input type="email" className="bg-bg-primary px-4 border border-purple-accent rounded-2xl" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
          </div>
          <div>
            <h3 className="my-2">Password</h3>
            <input type="password" className="bg-bg-primary px-4 border border-purple-accent rounded-2xl" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
          </div>
          <div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div>
            <button type="submit" className="p-5 pt-0 pb-0 mt-5 rounded-2xl bg-purple-accent text-text-primary cursor-pointer">Submit</button>
          </div>
          <div>
            <p onClick={() => navigate('/')} className="cursor-pointer text-purple-accent mt-6">
              Already have an account? Login here
            </p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default RegisterPage