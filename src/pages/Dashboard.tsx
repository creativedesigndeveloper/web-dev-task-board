import { Sidebar } from "@/components/Sidebar"
import { TaskCard } from "@/components/TaskCard"
import { TaskModal } from "@/components/TaskModal"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { updateTask } from "@/store/taskSlice"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { KanbanColumn } from "@/components/KanbanColumn"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"
import { subscribeToTasks, updateTaskToFirestore } from "@/api/taskApi"
import { setTasks } from "@/store/taskSlice"
import { subscribeToProjects } from "@/api/projectApi"
import { setProject } from "@/store/projectsSlice"

const DashBoard = () => {
  const todoTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'todo'))
  const inProgressTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'inProgress'))
  const completeTasks = useAppSelector((state) => state.task.tasks.filter(task => task.status === 'complete'))

  const tasks = useAppSelector((state) => state.task.tasks)
  const projects = useAppSelector((state) => state.projects.projects)
  const userId = useAppSelector((state) => state.auth.user?.id)

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
      updateTaskToFirestore({ ...task, status: newStatus })
    }
  }

  useEffect(() => {
    if (!userId) return
    const unsubscribeTasks = subscribeToTasks(userId, (tasks) => {
      dispatch(setTasks(tasks))
      return unsubscribeTasks
    })

  }, [tasks, userId, dispatch])
  useEffect(() => {
    if (!userId) return
    const unsubscribeProjects = subscribeToProjects(userId, (projects) => {
      dispatch(setProject(projects))
    })
    return unsubscribeProjects

  }, [projects, userId, dispatch])




  return (
    <>
      <div className="flex bg-bg-primary min-h-screen">
        <Sidebar />
        <DndContext onDragEnd={handleDragEnd}>
          <main className="flex-1 p-6">
            <motion.div
              className="flex gap-6 text-text-primary"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}

            >
              <KanbanColumn id="todo" title="To Do" count={todoTasks.length}>
                {todoTasks.map(task => (
                  <TaskCard key={task.id} task={task}
                    {...task.subTasks.map(subtask => (
                      <div key={subtask.id}>{subtask.title}</div>
                    ))}
                  />
                ))}
              </KanbanColumn>
              <KanbanColumn id="inProgress" title="In Progress" count={inProgressTasks.length}>
                {inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task}
                  />
                ))}
              </KanbanColumn>
              <KanbanColumn id="complete" title="Complete" count={completeTasks.length}>
                {completeTasks.map(task => (
                  <TaskCard key={task.id} task={task}
                    {...task.subTasks.map(subtask => (
                      <div key={subtask.id}>{subtask.title}</div>
                    ))}
                  />
                ))}
              </KanbanColumn>
            </motion.div>
          </main>
        </DndContext>
      </div>
      <AnimatePresence>
        <TaskModal />
      </AnimatePresence>
    </>
  )
}

export default DashBoard