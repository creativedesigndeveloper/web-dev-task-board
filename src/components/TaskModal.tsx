import { addSubTaskToFirestore, deleteTaskToFirestore, updateTaskToFirestore } from "@/api/taskApi";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { addSubTask, deleteTask, setSelectedTask, toggleSubTask, updateTask } from "@/store/taskSlice";
import { motion, AnimatePresence } from 'framer-motion'
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const priorityColour = {
  highPriority: 'bg-priority-high',
  midPriority: 'bg-priority-mid',
  lowPriority: 'bg-priority-low'
}


export const TaskModal = () => {
  const selectedTask = useAppSelector((state) => state.task.tasks.find(task => task.id === state.task.selectedTask))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [newSubTask, setNewSubTask] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editingSubTaskId, setEditingSubTaskId] = useState<string | null>(null)
  const [editingSubTaskValue, setEditingSubTaskValue] = useState('')
  const [editedTask, setIsEditedTask] = useState({
    title: selectedTask?.title,
    category: selectedTask?.category,
    status: selectedTask?.status,
    priority: selectedTask?.priority,
    subTasks: selectedTask?.subTasks
  })

  const onAddSubTask = () => {
    if (!newSubTask.trim()) return
    if (!selectedTask) return
    const id = crypto.randomUUID()

    dispatch(addSubTask({
      taskId: selectedTask.id,
      subTask: {
        id: id,
        title: newSubTask,
        isCompleted: false
      }
    }))
    addSubTaskToFirestore(
      selectedTask, {
      id: id,
      title: newSubTask,
      isCompleted: false,
    })
    setNewSubTask('')
  }

  const editMode = () => {
    setIsEditedTask({
      title: selectedTask?.title ?? '',
      category: selectedTask?.category ?? '',
      status: selectedTask?.status ?? 'todo',
      priority: selectedTask?.priority ?? 'lowPriority',
      subTasks: selectedTask?.subTasks ?? [],
    })
    setIsEditing(true)
    return
  }

  const editSubTask = () => {
    if (!selectedTask) return
    const updatedSubTasks = selectedTask.subTasks.map(st => (
      st.id === editingSubTaskId ? { ...st, title: editingSubTaskValue } : st
    ))

    dispatch(updateTask({
      ...selectedTask,
      subTasks: updatedSubTasks
    }))
    updateTaskToFirestore({
      ...selectedTask,
      subTasks: updatedSubTasks
    })
    setEditingSubTaskId(null)
  }

  const onSave = () => {
    if (!selectedTask) return
    dispatch(updateTask({
      ...selectedTask,
      title: editedTask.title ?? selectedTask?.title,
      category: editedTask.category ?? selectedTask?.category,
      status: editedTask.status ?? selectedTask?.status,
      priority: editedTask.priority ?? selectedTask?.priority,
      subTasks: editedTask.subTasks ?? selectedTask?.subTasks
    }))
    updateTaskToFirestore({
      ...selectedTask,
      title: editedTask.title ?? selectedTask?.title,
      category: editedTask.category ?? selectedTask?.category,
      status: editedTask.status ?? selectedTask?.status,
      priority: editedTask.priority ?? selectedTask?.priority,
      subTasks: editedTask.subTasks ?? selectedTask?.subTasks
    })
    setIsEditing(false)
  }

  const onCancel = () => {
    setIsEditing(false)
  }

  const onDelete = () => {
    if (!selectedTask) return null
    dispatch(deleteTask(selectedTask.id))
    dispatch(setSelectedTask(null))
    deleteTaskToFirestore(selectedTask)
  };

  const onClose = () => {
    dispatch(setSelectedTask(null))
  }

  const onFocus = () => {
    navigate('/focus', { state: { taskId: selectedTask?.id } })
  }


  return (
    <AnimatePresence>
      {selectedTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-bg-card rounded-xl p-6 w-96">
            {isEditing === true ? <>
              <div className="mb-6">
                <div>
                  <h1 className="text-text-primary bg-bg-secondary text-center px-3 mb-5 rounded-2xl">Edit Task</h1>
                </div>
                <div>
                  <h2 className="text-text-primary px-2 my-2 bg-purple-dark rounded-2xl">Task Name</h2>
                  <input type="text"
                    value={editedTask.title}
                    onChange={(e) => setIsEditedTask(prev => ({ ...prev, title: e.target.value }))}

                    placeholder="Add Task"
                    className="bg-bg-secondary text-text-primary"
                  />
                </div>
                <div>
                  <h2 className="text-text-primary px-2 my-2 bg-purple-dark rounded-2xl">Category</h2>
                  <input type="text"
                    value={editedTask.category}
                    onChange={(e) => setIsEditedTask((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="Add Category"
                    className="bg-bg-secondary text-text-primary"
                  />
                </div>
                <div>
                  <h2 className="text-text-primary px-2 my-2 bg-purple-dark rounded-2xl">Status</h2>
                  <select value={editedTask.status} onChange={(e) => setIsEditedTask((prev) => ({ ...prev, status: (e.target as HTMLSelectElement).value as 'todo' | 'inProgress' | 'complete' }))} className="bg-bg-secondary text-text-primary">
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>
                <div>
                  <h2 className="text-text-primary px-2 my-2 bg-purple-dark rounded-2xl">Priority</h2>
                  <select value={editedTask.priority} onChange={(e) => setIsEditedTask((prev) => ({ ...prev, priority: (e.target as HTMLSelectElement).value as 'lowPriority' | 'midPriority' | 'highPriority' }))} className="bg-bg-secondary text-text-primary">
                    <option value="lowPriority">Low Priority</option>
                    <option value="midPriority">Medium Priority</option>
                    <option value="highPriority">High Priority</option>
                  </select>
                </div>

              </div>
              <div className="text-center">
                <button onClick={onSave} className="text-black bg-green-400 px-4 my-2 rounded-2xl cursor-pointer">Submit</button>
                <button onClick={onCancel} className="text-text-primary bg-red-500 px-4 my-2 mx-2 rounded-2xl cursor-pointer">Cancel</button>
              </div>
            </> :
              <>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-text-primary font-bold text-2xl">{selectedTask.title}</h3>
                  <span className={`w-3 h-3 rounded-full ${priorityColour[selectedTask.priority]}`} />
                </div>
                <div>
                  <button onClick={onFocus} className="text-xs bg-purple-dark text-text-primary px-2 py-0.5 my-1 rounded-lg cursor-pointer">Task Focus</button>
                </div>
                <span className="text-xs bg-purple-accent text-white px-2 py-1 rounded-lg">{selectedTask.category}</span>
                <button onClick={editMode} className="text-xs bg-orange-400 text-text-primary px-4 my-2 mx-2 rounded-2xl cursor-pointer">Edit</button>
                <h4 className="text-text-primary font-bold bg-bg-secondary pl-2 my-3">Subtasks</h4>
                <div className="flex gap-2 my-3">
                  <input
                    type="text"
                    value={newSubTask}
                    onChange={(e) => {
                      setNewSubTask(e.target.value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onAddSubTask()
                    }}
                    placeholder="Add subtask..."
                    className="bg-bg-secondary text-text-primary rounded-lg p-2 flex-1"
                  />

                  <button className="bg-bg-secondary text-white px-3 rounded-lg cursor-pointer" onClick={onAddSubTask}>Add</button>
                </div>
                {selectedTask?.subTasks.map((subtask) => (

                  <div key={subtask.id} className="flex items-center justify-between gap-2 my-2 border-b-2 border-white/40 last:border-b-0">
                    <div>
                      <input
                        type="checkbox"
                        checked={subtask.isCompleted}
                        onChange={() => dispatch(toggleSubTask({
                          taskId: selectedTask.id,
                          subTaskId: subtask.id
                        }))}
                      />
                      {subtask.id === editingSubTaskId ? <input className="text-text-primary ml-2" value={editingSubTaskValue} onChange={(e) => setEditingSubTaskValue(e.target.value)}></input> : <span className="text-text-primary ml-2">{subtask.title}</span>}
                    </div>
                    {subtask.id === editingSubTaskId ? <button onClick={() => editSubTask()} className="flex ml-2 px-4 text-text-primary bg-green-400 rounded-xl text-xs cursor-pointer">Update</button> : <button onClick={() => {
                      setEditingSubTaskId(subtask.id)
                      setEditingSubTaskValue(subtask.title)
                    }} className="flex ml-2 px-4 text-text-primary bg-gray-700 rounded-xl text-xs cursor-pointer">Edit</button>}
                  </div>

                ))}
                <div className="flex items-center justify-between">
                  <button className="bg-red-600 px-2 rounded-full mt-4 mb-2 text-text-primary cursor-pointer" onClick={onDelete}>Delete</button>
                  <button className="bg-purple-dark px-2 rounded-full mt-4 text-text-primary cursor-pointer" onClick={onClose}>Close</button>
                </div>
              </>

            }


          </motion.div>
        </motion.div>

      )}

    </AnimatePresence>
  )
}