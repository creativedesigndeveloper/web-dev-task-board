import { ProjectCard } from "@/components/ProjectCard"
import { Sidebar } from "@/components/Sidebar"
import { useAppSelector } from "@/hooks/useAppDispatch"
import { motion } from "framer-motion"


const Projects = () => {
  const projects = useAppSelector((state) => state.projects.projects)

  return (
    <>
      <div className="flex relative z-10">
        <Sidebar />
        <motion.div
          className="m-10 grid grid-cols-2 gap-4 items-start justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {projects.length > 0 ? [...projects].sort((a, b) => a.createdAt.localeCompare(b.createdAt)).map(project => (
            <ProjectCard key={project.id} project={project} />
          )) : <h3 className="text-text-primary bg-bg-secondary flex items-center text-center text-xl p-3 rounded-full">No Projects</h3>}
        </motion.div>
      </div>
    </>
  )
}

export default Projects