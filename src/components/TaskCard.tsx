import type { Task } from "@/types/task";
import { setSelectedTask, toggleSubTask } from "@/store/taskSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useDraggable } from "@dnd-kit/core";
import { motion } from 'framer-motion'
import { CSS } from '@dnd-kit/utilities'

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
        className="bg-bg-card rounded-xl p-4 mb-3 border border-purple-accent" onClick={() => dispatch(setSelectedTask(task.id))}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-text-primary font-bold">{task.title}</h3>
          <div className="flex items-center gap-2 ml-auto">
            <span {...listeners} className="cursor-grab text-text-secondary px-1">⠿</span>
            <span className={`w-3 h-3 rounded-full ${priorityColour[task.priority]}`} />
          </div>
        </div>
        <span className="text-xs bg-purple-accent text-white px-2 py-1 rounded-lg">{task.category}</span>
        {task.subTasks.map(subtask => (
          <div key={subtask.id} className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              className=" border-purple-accent"
              checked={subtask.isCompleted}
              onChange={() => dispatch(toggleSubTask({
                taskId: task.id,
                subTaskId: subtask.id
              }))}
            />
            <span className="text-text-primary">{subtask.title}</span>
          </div>
        ))}




      </div>

    </motion.div>

  )
}