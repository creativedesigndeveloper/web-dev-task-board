import type { Task } from "@/types/Task";
import { setSelectedTask } from "@/store/taskSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task
}

const priorityColour = {
  highPriority: 'bg-priority-high',
  midPriority: 'bg-priority-mid',
  lowPriority: 'bg-priority-low'
}



export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id
  })

  const style = transform ? {
    transform: `translate(${transform.x}px, ${transform.y}px)`
  } : undefined

  const dispatch = useAppDispatch()


  return (

    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} className="bg-bg-card rounded-xl p-4 mb-3 border border-purple-accent" onClick={() => dispatch(setSelectedTask(task))}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-primary font-bold">{task.title}</h3>
        <span className={`w-3 h-3 rounded-full ${priorityColour[task.priority]}`} />
      </div>
      <span className="text-xs bg-purple-accent text-white px-2 py-1 rounded-lg">{task.category}</span>

    </div>
  )
}