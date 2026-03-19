import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { logout } from "@/store/authSlice"
import { useNavigate } from "react-router-dom"

const DashBoard = () => {
  const userName = useAppSelector((state) => state.auth.user?.name)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userLogout = () => {
    dispatch(logout())
    navigate('/')
  }


  return (
    <>
      <h1>{`Welcome ${userName} to the Web Dev Task Board`}</h1>
      <button onClick={userLogout}>Logout</button>
    </>
  )
}

export default DashBoard