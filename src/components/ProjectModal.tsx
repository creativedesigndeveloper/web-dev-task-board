import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch"
import { AnimatePresence, motion } from "framer-motion"
import { deleteProject, setSelectedProject } from "@/store/projectsSlice"
import { useMemo } from "react"
import { deleteProjectToFirestore } from "@/api/projectApi"




export const ProjectModal = () => {
  const tasks = useAppSelector((state) => state.task.tasks)
  const selectedProject = useAppSelector((state) => state.projects.projects.find(p => p.id === state.projects.selectedProject))
  const projectTasks = useMemo(() => tasks.filter(task => task.projectId === selectedProject?.id), [tasks, selectedProject?.id])
  const dispatch = useAppDispatch()

  const statusColour = {
    active: 'bg-green-400',
    archived: 'bg-orange-500'
  }

  const deleteProjects = () => {
    if (!selectedProject) return
    dispatch(deleteProject(selectedProject?.id))
    deleteProjectToFirestore((selectedProject))
  }

  const onClose = () => {
    dispatch(setSelectedProject(null))
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
                <h3 className="text-text-primary font-bold text-2xl">{selectedProject.title}</h3>
                <span className={`w-8 h-3 rounded-full ${statusColour[selectedProject.status]}`} />
              </div>
              <span className="text-xs bg-purple-accent text-white px-2 py-1 rounded-lg overflow-hidden line-clamp-3">{selectedProject.description}</span>
              <button className="text-xs bg-orange-400 text-text-primary px-4 my-2 mx-2 rounded-2xl cursor-pointer">Edit</button>
              {projectTasks.length > 0 ? projectTasks.map((p) => (

                <div key={p.id} className="flex items-center justify-between gap-2 my-2 border-b-2 border-white/40 last:border-b-0">
                  <div>
                    <span className="text-text-primary ml-2">{p.title}</span>
                  </div>
                  <button className="flex ml-2 px-4 text-text-primary bg-gray-700 rounded-xl text-xs cursor-pointer">Edit</button>
                </div>

              )) : <div className="text-text-primary bg-gray-500 rounded-2xl w-50 px-2">No current tasks</div>}
              <div className="flex items-center justify-between">
                <button className="bg-red-600 px-2 rounded-full mt-4 mb-2 text-text-primary cursor-pointer" onClick={deleteProjects}>Delete</button>
                <button className="bg-purple-dark px-2 rounded-full mt-4 text-text-primary cursor-pointer" onClick={onClose}>Close</button>
              </div>
            </>

          </motion.div>
        </motion.div>

      )}

    </AnimatePresence>
  )
}