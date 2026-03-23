import { Sidebar } from "@/components/Sidebar"
import { TaskCard } from "@/components/TaskCard"
import { TaskModal } from "@/components/TaskModal"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { updateTask } from "@/store/taskSlice"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { KanbanColumn } from "@/components/KanbanColumn"
import PomodoroTimer from "@/components/PomodoroTimer"

const DashBoard = () => {
  const todoTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'todo'))
  const inProgressTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'inProgress'))
  const completeTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'complete'))

  const dispatch = useAppDispatch()

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (!over) return

    const taskId = active.id as string
    const newStatus = over.id as 'todo' | 'inProgress' | 'complete'

    const task = todoTasks
      .concat(inProgressTasks)
      .concat(completeTasks)
      .find(t => t.id === taskId)

    if (task) {
      dispatch(updateTask({ ...task, status: newStatus }))
    }
  }




  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <Sidebar />
        <DndContext onDragEnd={handleDragEnd}>
          <main className="flex-1 p-6">
            <PomodoroTimer />
            <div className="flex gap-6 text-text-primary">
              <KanbanColumn id="todo" title="To Do" count={todoTasks.length}>
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </KanbanColumn>
              <KanbanColumn id="inProgress" title="In Progress" count={inProgressTasks.length}>
                {inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </KanbanColumn>
              <KanbanColumn id="complete" title="Complete" count={completeTasks.length}>
                {completeTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </KanbanColumn>
            </div>
          </main>
        </DndContext>
      </div>
      <TaskModal />
    </>
  )
}

export default DashBoard