import type { Task } from "@/types/Task";
import { deleteTask } from "@/store/taskSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface TaskCardProps {
  task: Task
}



export const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useAppDispatch()
  const onDelete = (() => {
    dispatch(deleteTask(task.id))
  });
  <>
    <h2>{task.title}</h2>
    <p>{task.category}</p>
    <p>{task.priority}</p>
    <p>{`${task.subTasks.filter(subtask => subtask.isCompleted === true)}/${task.subTasks.length}`}</p>
    <button onClick={onDelete}>Delete</button>
  </>
}