import { addTaskToFirestore } from "@/api/taskApi"
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { addTask } from "@/store/taskSlice"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface AddProjectTaskFormProps {
  projectId: string
  onClose: () => void
}

export const AddProjectTaskForm = ({ projectId, onClose }: AddProjectTaskFormProps) => {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState<'todo' | 'inProgress' | 'complete'>('todo')
  const [priority, setPriority] = useState<'highPriority' | 'midPriority' | 'lowPriority'>('lowPriority')
  const [error, setError] = useState('')
  const userId = useAppSelector((state) => state.auth.user?.id)


  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text === '' || category === '') {
      setError('Enter all fields')
      setTimeout(() => setError(''), 3000)
      return
    }
    const id = crypto.randomUUID()
    if (!userId) return

    dispatch(addTask({
      title: text,
      id: id,
      projectId: projectId,
      priority: priority,
      status: status,
      category: category,
      subTasks: []
    }),
    )
    addTaskToFirestore({
      title: text,
      id: id,
      projectId: projectId,
      priority: priority,
      status: status,
      category: category,
      subTasks: []
    }, userId)
    onClose()
    setText('')
    setCategory('')
    setStatus('todo')
    setPriority('lowPriority')
  }



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-80"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="border border-purple-accent bg-bg-primary rounded-xl p-6 w-96 text-text-primary text-center scale-80 md:scale-100"
        >
          <form onSubmit={onSubmit}>
            <div className="mb-2">
              <input className="p-2 m-2 bg-bg-secondary rounded-lg text-text-primary w-full" type="text" value={text} onChange={(e) => {
                setText(e.target.value)
              }} placeholder="Enter Task" />
            </div>
            <div className="mb-2">
              <input className="p-2 m-2 bg-bg-secondary rounded-lg text-text-primary w-full" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter Category" />
            </div>
            <div className="mb-2">
              <select className="p-2 m-2" name="task-status" value={status} onChange={(e) => setStatus((e.target as HTMLSelectElement).value as 'todo' | 'inProgress' | 'complete')}>
                <option value='todo'>To Do</option>
                <option value='inProgress'>In Progress</option>
                <option value='complete'>Complete</option>
              </select>
              <select className="m-2 p-2" name="task-priority" value={priority} onChange={(e) => setPriority((e.target as HTMLSelectElement).value as 'lowPriority' | 'midPriority' | 'highPriority')}>
                <option value='lowPriority'>Low Priority</option>
                <option value='midPriority'>Medium Priority</option>
                <option value='highPriority'>High Priority</option>
              </select>
            </div>
            <div className="mb-2">
            </div>
            <p className="text-red-500 text-sm">{error}</p>
            <div>
              <button className="bg-purple-accent p-7 pt-0 pb-0 rounded-full mt-5 cursor-pointer" type="submit">Submit</button>
              <button className="bg-red-500 p-7 py-0 rounded-full mt-5 mx-5 cursor-pointer" onClick={() => onClose()}>Cancel</button>
            </div>
          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
