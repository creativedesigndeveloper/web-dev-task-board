import ProtectedRoute from "@/components/ProtectedRoute";
import DashBoard from "@/pages/Dashboard";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import Projects from "@/pages/Projects";
import Settings from "@/pages/Settings";
import Templates from "@/pages/Templates";
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
    path: '/projects',
    element: <Projects />
  },
  {
    path: '/templates',
    element: <Templates />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router