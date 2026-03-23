import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import { AddTaskForm } from "./AddTaskForm"



export const Sidebar = () => {
  const [showAddTask, setShowAddTask] = useState(false)


  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <div className="max-w-full min-h-screen bg-bg-secondary p-3 pl-0">
        <h1 className="text-text-primary p-2 bg-purple-dark rounded-full">Web Dev TaskBoard</h1>
        <div className="text-text-primary text-center p-2 pl-0">
          <div className={`${location.pathname === '/dashboard' ? 'bg-purple-accent' : 'bg-bg-secondary'} mb-2 p-2 rounded-e-md border-b-bg-primary border-b-4`}>
            <h4 onClick={() => navigate('/dashboard')}>Dashboard</h4>
          </div>
          <div className={`${location.pathname === '/projects' ? 'bg-purple-accent' : 'bg-bg-secondary'} mb-2 p-2 rounded-e-md border-b-bg-primary border-b-4`}>
            <h4 onClick={() => navigate('/projects')}>Projects</h4>
          </div>
          <div className={`${location.pathname === '/templates' ? 'bg-purple-accent' : 'bg-bg-secondary'} mb-2 p-2 rounded-e-md border-b-bg-primary border-b-4`}>
            <h4 onClick={() => navigate('/templates')}>Templates</h4>
          </div>
          <div className={`${location.pathname === '/settings' ? 'bg-purple-accent' : 'bg-bg-secondary'} mb-2 p-2 rounded-e-md border-b-bg-primary border-b-4`}>
            <h4 onClick={() => navigate('/settings')}>Settings</h4>
          </div>
        </div>
        <button className="text-text-primary bg-purple-accent rounded-full p-2 m-1 pointer-coarse" onClick={() => setShowAddTask(true)}>+ New Task</button>

        {showAddTask && <AddTaskForm onClose={() => setShowAddTask(false)} />}
      </div>
    </>
  )
}