import { useAppSelector } from "@/hooks/useAppDispatch"
import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"


const FocusPage = () => {

  const tasks = useAppSelector((state) => state.task.tasks)
  const [focusTaskId, setFocusTaskId] = useState('')
  const focusTask = tasks.find(task => task.id === focusTaskId)
  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6 text-center justify-center">
          <select className="text-text-primary text-center justify-center" onChange={(e) => setFocusTaskId(e.target.value)}>
            <option value="">Select a task...</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>{task.title}</option>
            ))}
          </select>

        </div>
      </div>
    </>
  )
}

export default FocusPage