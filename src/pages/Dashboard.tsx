import { AddTaskForm } from "@/components/AddTaskForm"
import { TaskCard } from "@/components/TaskCard"
import { useAppSelector } from "@/hooks/useAppDispatch"

const DashBoard = () => {
  const todoTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'todo'))
  const inProgressTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'inProgress'))
  const completeTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'complete'))


  return (
    <>
      <AddTaskForm />

      <div>
        <h2>To Do</h2>
        <h4>{todoTasks.length}</h4>
        <div>
          {todoTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <div>
        <h2>In Progress</h2>
        <h4>{inProgressTasks.length}</h4>
        <div>
          {inProgressTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <div>
        <h2>Complete</h2>
        <h4>{completeTasks.length}</h4>
        <div>
          {completeTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DashBoard