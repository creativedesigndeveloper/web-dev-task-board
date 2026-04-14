import { AppLayout } from '@/components/AppLayout'
import { TaskCard } from "@/components/TaskCard"
import { TaskModal } from "@/components/TaskModal"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { updateTask } from "@/store/taskSlice"
import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors, TouchSensor } from "@dnd-kit/core"
import { KanbanColumn } from "@/components/KanbanColumn"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo } from "react"
import { subscribeToTasks, updateTaskToFirestore } from "@/api/taskApi"
import { setTasks } from "@/store/taskSlice"
import { subscribeToProjects } from "@/api/projectApi"
import { setProjects } from "@/store/projectsSlice"

const DashBoard = () => {
  const tasks = useAppSelector((state) => state.task.tasks)
  const todoTasks = useMemo(() => tasks.filter(task => task.status === 'todo'), [tasks])
  const inProgressTasks = useMemo(() => tasks.filter(task => task.status === 'inProgress'), [tasks])
  const completeTasks = useMemo(() => tasks.filter(task => task.status === 'complete'), [tasks])
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
      <AppLayout>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} >
          <main className="flex-1 p-6">
            <motion.div
              className="flex gap-6 text-text-primary flex-col mx-15 md:flex-row"
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
      </AppLayout>
      <AnimatePresence>
        <TaskModal />
      </AnimatePresence>
    </>
  )
}

export default DashBoard