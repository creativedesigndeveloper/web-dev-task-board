import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { AddTaskForm } from "./AddTaskForm"
import { logoutUser } from "@/api/authApi"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { logout } from "@/store/authSlice"
import AddNewProject from "./AddNewProject"



export const Sidebar = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)


  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const navClass = (path: string) =>
    `${location.pathname === path ? 'bg-purple-accent' : 'bg-bg-secondary'} mb-2 p-2 rounded-e-md`

  const signOut = async () => {
    await logoutUser()
    dispatch(logout())
    navigate('/')
  }


  return (
    <>
      <div className="max-w-full bg-bg-secondary p-3 pl-0 flex flex-col justify-between h-screen">
        <div className="text-text-primary text-center p-2 pl-0">
          <h1 className="text-text-primary px-5 py-2 font-bold bg-purple-dark rounded-full mb-5">Web Dev TaskBoard</h1>
          <div className={navClass('/dashboard')}>
            <h4 onClick={() => navigate('/dashboard')}>Dashboard</h4>
          </div>
          <div className={navClass('/projects')}>
            <h4 onClick={() => navigate('/projects')}>Projects</h4>
          </div>
          <div className="text-left mt-4">
            <div>
              <button className="text-text-primary bg-purple-accent rounded-full px-4 py-0.5 m-1 pointer-coarse" onClick={() => setShowAddTask(true)}>+ New Task</button>
            </div>
            <div>
              <button className="text-text-primary bg-purple-light rounded-2xl px-4 py-0.5 m-1 pointer-coarse" onClick={() => setShowAddProject(true)}>+ New Project</button>
            </div>

          </div>
        </div>
        <div>
          <div>
            <button className="text-text-primary bg-purple-dark rounded-full p-4 py-0 mt-5 ml-3 cursor-pointer" onClick={signOut}>Logout</button>
          </div>
        </div>

        {showAddTask && <AddTaskForm onClose={() => setShowAddTask(false)} />}
        {showAddProject && <AddNewProject onClose={() => setShowAddProject(false)} />}
      </div>
    </>
  )
}