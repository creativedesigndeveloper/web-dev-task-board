import { useAppSelector, useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteTask, setSelectedTask, toggleSubTask } from "@/store/taskSlice";
import { motion, AnimatePresence } from 'framer-motion'

const priorityColour = {
  highPriority: 'bg-priority-high',
  midPriority: 'bg-priority-mid',
  lowPriority: 'bg-priority-low'
}


export const TaskModal = () => {
  const selectedTask = useAppSelector(state => state.task.selectedTask)
  const dispatch = useAppDispatch()


  const onDelete = () => {
    if (!selectedTask) return null
    dispatch(deleteTask(selectedTask.id))
    dispatch(setSelectedTask(null))
  };

  const onClose = () => {
    dispatch(setSelectedTask(null))
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
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-text-primary font-bold text-2xl">{selectedTask.title}</h3>
              <span className={`w-3 h-3 rounded-full ${priorityColour[selectedTask.priority]}`} />
            </div>
            <span className="text-xs bg-purple-accent text-white px-2 py-1 rounded-lg">{selectedTask.category}</span>
            {selectedTask.subTasks.map(subtask => (
              <div key={subtask.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  onChange={() => dispatch(toggleSubTask({
                    taskId: selectedTask.id,
                    subTaskId: subtask.id
                  }))}
                />
                <span className="text-text-primary">{subtask.title}</span>
              </div>

            ))}
            <div>
              <button className="bg-red-600 px-2 rounded-full mt-2 mb-2 text-text-primary" onClick={onDelete}>Delete</button>
            </div>
            <button className="bg-purple-dark px-2 rounded-full mt-5 text-text-primary" onClick={onClose}>Close</button>

          </motion.div>
        </motion.div>

      )}

    </AnimatePresence>
  )
}