import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Starfield from "@/components/Starfield";
import DashBoard from "@/pages/Dashboard";
import FocusPage from "@/pages/FocusPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import Projects from "@/pages/Projects";
import RegisterPage from "@/pages/RegisterPage";
import Settings from "@/pages/Settings";
import Templates from "@/pages/Templates";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashBoard />
          },
          {
            path: '/projects',
            element: <Projects />
          },
          {
            path: '/focus',
            element: <FocusPage />
          }
        ]
      },

    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router