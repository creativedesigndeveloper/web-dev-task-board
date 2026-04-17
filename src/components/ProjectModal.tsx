import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { AnimatePresence, motion } from "framer-motion"
import { deleteProject, setSelectedProject, updateProject } from "@/store/projectsSlice"
import { useMemo, useState } from "react"
import { deleteProjectToFirestore, updateProjectToFirestore } from "@/api/projectApi"
import { addTask } from "@/store/taskSlice"
import { addTaskToFirestore } from "@/api/taskApi"




export const ProjectModal = () => {
  const selectedProject = useAppSelector((state) => state.projects.projects.find(p => p.id === state.projects.selectedProject))
  const tasks = useAppSelector((state) => state.task.tasks)
  const projectTasks = useMemo(() => tasks.filter(task => task.projectId === selectedProject?.id), [tasks, selectedProject?.id])
  const userId = useAppSelector((state) => state.auth.user?.id)

  const dispatch = useAppDispatch()
  const [text, setText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setIsEditedTask] = useState({
    title: selectedProject?.title,
    description: selectedProject?.description,
    status: selectedProject?.status,
    dueDate: selectedProject?.dueDate
  })

  const statusColour = {
    active: 'bg-green-400',
    archived: 'bg-orange-500'
  }

  const addProjectTask = () => {
    if (!userId) return
    const id = crypto.randomUUID()
    dispatch(addTask({
      title: text,
      id: id,
      category: 'New Task',
      status: 'todo',
      priority: 'lowPriority',
      projectId: selectedProject?.id,
      subTasks: [],
    }))
    addTaskToFirestore({
      title: text,
      id: id,
      category: 'New Task',
      status: 'todo',
      priority: 'lowPriority',
      projectId: selectedProject?.id,
      subTasks: [],
    }, userId)
    setText('')
  }

  const deleteProjects = () => {
    if (!selectedProject) return
    dispatch(deleteProject(selectedProject?.id))
    deleteProjectToFirestore((selectedProject))
  }

  const editMode = () => {
    setIsEditedTask({
      title: selectedProject?.title ?? '',
      description: selectedProject?.description ?? '',
      status: selectedProject?.status ?? 'active',
      dueDate: selectedProject?.dueDate ?? ''
    })
    setIsEditing(true)
  }

  const onClose = () => {
    dispatch(setSelectedProject(null))
  }
  const onCancel = () => {
    setIsEditing(false)
  }

  const onSave = () => {
    if (!selectedProject) return
    dispatch(updateProject({
      ...selectedProject,
      title: editedTask.title ?? selectedProject?.title,
      description: editedTask.description ?? selectedProject?.description,
      status: editedTask.status ?? selectedProject?.status,
      dueDate: editedTask.dueDate ?? selectedProject?.dueDate
    }))
    updateProjectToFirestore({
      ...selectedProject,
      title: editedTask.title ?? selectedProject.title,
      description: editedTask.description ?? selectedProject.description,
      status: editedTask.status ?? selectedProject.status,
      dueDate: editedTask.dueDate ?? selectedProject.dueDate
    })
    setIsEditing(false)
  }

  return (
    <AnimatePresence>
      {selectedProject && (
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
            <>
              <div className="flex items-center justify-between mb-2">
                {isEditing ?
                  <input
                    value={editedTask.title}
                    onChange={(e) => setIsEditedTask((prev) => ({ ...prev, title: e.target.value }))}
                    className="text-text-primary font-bold text-2xl"></input>
                  : <h3 className="text-text-primary font-bold text-2xl">{selectedProject.title}</h3>}

                {isEditing ?
                  <select
                    value={editedTask.status}
                    className="text-text-primary"
                    onChange={(e) => setIsEditedTask((prev) => ({ ...prev, status: (e.target as HTMLSelectElement).value as 'active' | 'archived' }))}>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                  : <span className={`w-8 h-3 rounded-full ${statusColour[selectedProject.status]}`} />}
              </div>
              <button className="text-xs bg-orange-400 text-text-primary px-4  rounded-2xl cursor-pointer" onClick={editMode}>Edit</button>
              {isEditing ? <textarea value={editedTask.description} onChange={(e) => setIsEditedTask((prev) => ({ ...prev, description: e.target.value }))} className="text-xs bg-purple-accent text-white px-2 py-1 my-3 rounded-lg overflow-hidden line-clamp-3"></textarea>
                : <span className="text-xs bg-purple-accent text-white px-2 py-1 my-3 rounded-lg overflow-hidden line-clamp-3">{selectedProject.description}</span>}
              <div className="flex mb-3">
                <input type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addProjectTask() }}
                  className="bg-bg-secondary text-text-primary rounded-md w-full px-2"
                  placeholder="Add task..." />
                <button className="bg-bg-secondary text-text-primary px-3 py-1 ml-2 rounded-xl" onClick={addProjectTask}>Add</button>
              </div>
              {projectTasks ? projectTasks.map(project => (
                <div className="">
                  <h3 className="text-text-primary">{project.title}</h3>
                </div>
              ))
                : null}

              {isEditing ?
                <input type="date"
                  value={editedTask.dueDate}
                  className="text-text-primary"
                  onChange={(e) => setIsEditedTask((prev) => ({ ...prev, dueDate: e.target.value }))}></input>
                : null
              }
              <div className="flex items-center justify-between">
                {isEditing ?
                  <>
                    <button className="bg-red-600 px-2 rounded-full mt-4 mb-2 text-text-primary cursor-pointer"
                      onClick={onCancel}>Close</button>
                    <button className="bg-purple-dark px-2 rounded-full mt-4 text-text-primary cursor-pointer"
                      onClick={onSave}>Update</button>
                  </>
                  :
                  <>
                    <button className="bg-red-600 px-2 rounded-full mt-4 mb-2 text-text-primary cursor-pointer" onClick={deleteProjects}>Delete</button>
                    <button className="bg-purple-dark px-2 rounded-full mt-4 text-text-primary cursor-pointer" onClick={onClose}>Close</button>
                  </>
                }
              </div>
            </>

          </motion.div>
        </motion.div>

      )}

    </AnimatePresence>
  )
}