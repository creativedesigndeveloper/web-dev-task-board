import Layout from "@/components/Layout";
import { ProjectDashboard } from "@/pages/ProjectDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashBoard from "@/pages/Dashboard";
import FocusPage from "@/pages/FocusPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import Projects from "@/pages/Projects";
import RegisterPage from "@/pages/RegisterPage";
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
            path: `/projects/:projectId`,
            element: <ProjectDashboard />
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