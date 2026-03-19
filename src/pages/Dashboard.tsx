import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { logout } from "@/store/authSlice"
import { useNavigate } from "react-router-dom"

const DashBoard = () => {
  const userName = useAppSelector((state) => state.auth.user?.name)
  const email = useAppSelector((state) => state.auth.user?.email)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userLogout = () => {
    console.log(userName)
    dispatch(logout())
    navigate('/')
  }


  return (
    <>
      <h1>{`Hello ${userName} with email ${email} `}</h1>
      <button onClick={userLogout}>Logout</button>
    </>
  )
}

export default DashBoard