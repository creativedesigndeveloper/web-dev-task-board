import type { Task } from "@/types/task";
import { setSelectedTask } from "@/store/taskSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useDraggable } from "@dnd-kit/core";
import { motion } from 'framer-motion'
import { CSS } from '@dnd-kit/utilities'
import { updateTask } from "@/store/taskSlice";
import { updateTaskToFirestore } from "@/api/taskApi";

interface TaskCardProps {
  task: Task
}

const priorityColour = {
  highPriority: 'bg-priority-high',
  midPriority: 'bg-priority-mid',
  lowPriority: 'bg-priority-low'
}



export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id
  })


  const style = {
    transform: CSS.Translate.toString(transform),
  }

  const updateSubTask = (subtaskId: string) => {

    const updatedSubTasks = task.subTasks.map(st =>
      st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
    )

    const updatedTask = { ...task, subTasks: updatedSubTasks }

    dispatch(updateTask(updatedTask))
    updateTaskToFirestore(updatedTask)
  }

  const dispatch = useAppDispatch()

  return (
    <motion.div
      initial={isDragging ? false : { opacity: 0, y: 20 }}
      animate={isDragging ? false : { opacity: 1, y: 0 }}
      exit={isDragging ? {} : { opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >


      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="bg-bg-card rounded-xl p-4 mb-3 border border-purple-accent flex flex-col min-w-60 md:block">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-text-primary font-bold cursor-pointer" onClick={() => dispatch(setSelectedTask(task.id))}>{task.title}</h3>
          <div className="flex items-center gap-2 ml-auto">
            <span {...listeners} className="cursor-grab text-text-secondary px-1">⠿</span>
            <span className={`w-3 h-3 rounded-full ${priorityColour[task.priority]}`} />
          </div>
        </div>
        <span className="text-xs bg-purple-accent text-white px-2 py-1 rounded-lg">{task.category}</span>
        {
          <>
            {task.subTasks.filter(st => st.isCompleted === false).map(subtask => (
              <div key={subtask.id} className="flex-1 items-center gap-2 mt-1 border-b-2 border-white/40 last:border-b-0">
                <input
                  type="checkbox"
                  className=" border-purple-accent my-2"
                  checked={subtask.isCompleted}
                  onChange={() => updateSubTask(subtask.id)}
                />
                <span className="text-text-primary ml-2 ">{subtask.title}</span>
              </div>
            ))}
            {task.subTasks.find(subtask => subtask.isCompleted === true) ? <span className="text-text-primary font-bold  bg-purple-dark px-5 rounded-xl">Completed</span> : null}
            {task.subTasks.filter(st => st.isCompleted).map(subtask => (
              <div key={subtask.id} className="flex-1 items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  className=" border-purple-accent my-2"
                  checked={subtask.isCompleted}
                  onChange={() => updateSubTask(subtask.id)}
                />
                <span className="text-gray-500 ml-2 ">{subtask.title}</span>
              </div>
            ))}

          </>

        }




      </div>

    </motion.div>

  )
}