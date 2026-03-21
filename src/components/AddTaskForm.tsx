import { useAppDispatch } from "@/hooks/useAppDispatch"
import { addTask } from "@/store/taskSlice"
import { useState } from "react"

export const AddTaskForm = () => {

  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<'todo' | 'inProgress' | 'complete'>('todo')
  const [priority, setPriority] = useState<'highPriority' | 'midPriority' | 'lowPriority'>('lowPriority')


  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = crypto.randomUUID()
    dispatch(addTask({
      title: text,
      id: id,
      priority: priority,
      status: status,
      category: category,
      subTasks: []
    }))
  }

  return (
    <>
      <h1>Task Form</h1>
      <form onSubmit={onSubmit}>
        <div>
          <h3>Enter Task</h3>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter Task" />
        </div>
        <div>
          <h3>Category</h3>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category" />
        </div>
        <div>
          <h3>Status</h3>
          <select name="task-status" value={status} onChange={(e) => setStatus((e.target as HTMLSelectElement).value as 'todo' | 'inProgress' | 'complete')}>
            <option value='todo'>To Do</option>
            <option value='inProgress'>In Progress</option>
            <option value='complete'>Complete</option>
          </select>
        </div>
        <div>
          <h3>Priority</h3>
          <select name="task-priority" value={priority} onChange={(e) => setPriority((e.target as HTMLSelectElement).value as 'lowPriority' | 'midPriority' | 'highPriority')}>
            <option value='lowPriority'>Low Priority</option>
            <option value='midPriority'>Medium Priority</option>
            <option value='highPriority'>High Priority</option>
          </select>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}