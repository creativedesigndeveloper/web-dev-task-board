import { Sidebar } from "@/components/Sidebar"
import { TaskCard } from "@/components/TaskCard"
import { TaskModal } from "@/components/TaskModal"
import { useAppSelector } from "@/hooks/useAppDispatch"

const DashBoard = () => {
  const todoTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'todo'))
  const inProgressTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'inProgress'))
  const completeTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'complete'))



  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex gap-6 text-text-primary">
            <div className="p-3 rounded-2xl bg-bg-secondary flex-1">
              <h2>To Do</h2>
              <h4>{todoTasks.length}</h4>
              <div>
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-bg-secondary flex-1">
              <h2>In Progress</h2>
              <h4>{inProgressTasks.length}</h4>
              <div>
                {inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-bg-secondary flex-1">
              <h2>Complete</h2>
              <h4>{completeTasks.length}</h4>
              <div>
                {completeTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <TaskModal />
    </>
  )
}

export default DashBoard