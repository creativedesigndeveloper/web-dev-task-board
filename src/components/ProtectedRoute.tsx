import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppDispatch";

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  if (isAuthenticated) {
    return <Outlet />
  } else {
    return <Navigate to='/' />
  }
}

export default ProtectedRoute