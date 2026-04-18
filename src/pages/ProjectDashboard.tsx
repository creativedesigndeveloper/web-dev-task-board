import { useParams } from "react-router-dom"
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { useState, useEffect } from "react"
import { updateTask, setTasks } from "@/store/taskSlice"
import { updateTaskToFirestore, subscribeToTasks } from "@/api/taskApi"
import { KanbanColumn } from "@/components/KanbanColumn"
import { motion, AnimatePresence } from 'framer-motion'
import { TaskCard } from "@/components/TaskCard"
import type { Task } from "@/types/task"
import { subscribeToProjects } from "@/api/projectApi"
import { setProjects } from "@/store/projectsSlice"
import { TaskModal } from "@/components/TaskModal"




export const ProjectDashboard = () => {
  const { projectId } = useParams()
  const dispatch = useAppDispatch()
  const selectedProject = useAppSelector((state) => state.projects.projects.find(p => p.id === state.projects.selectedProject))
  const projectTasks = useAppSelector((state) => state.task.tasks.filter(task => task.projectId === projectId))
  const todoTasks = projectTasks.filter(task => task.status === 'todo')
  const inProgressTasks = projectTasks.filter(task => task.status === 'inProgress')
  const completeTasks = projectTasks.filter(task => task.status === 'complete')
  const userId = useAppSelector((state) => state.auth.user?.id)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const handleDragStart = (e: DragStartEvent) => {
    const task = [...todoTasks, ...inProgressTasks, ...completeTasks].find(t => t.id === e.active.id)
    setActiveTask(task ?? null)
  }

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
    })
    return unsubscribeTasks

  }, [userId, dispatch])

  useEffect(() => {
    if (!userId) return
    const unsubscribeProjects = subscribeToProjects(userId, (projects) => {
      dispatch(setProjects(projects))
    })
    return unsubscribeProjects

  }, [userId, dispatch])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  )

  return (
    <>
      <h1 className="flex items-center justify-center text-3xl text-text-primary p-5 font-bold">{selectedProject?.title}</h1>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
        <main className="p-6">
          <motion.div
            className="flex gap-6 text-text-primary flex-col mx-50 md:flex-row 2xl:mx-96"
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
          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </main>

      </DndContext>
      <AnimatePresence>
        <TaskModal />
      </AnimatePresence>
    </>
  )
}