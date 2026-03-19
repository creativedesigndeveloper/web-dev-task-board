import ProtectedRoute from "@/components/ProtectedRoute";
import DashBoard from "@/pages/Dashboard";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashBoard />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router